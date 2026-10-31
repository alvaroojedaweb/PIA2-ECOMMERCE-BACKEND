import crypto from "node:crypto";
import { Op } from "sequelize";
import db from "../models/index.model.js";
import { enviarRecuperacionPassword } from "../services/emailService.js";
import {
  compararPassword,
  encriptarPassword,
  generarToken,
  JWT_SECRET_ADMIN,
  JWT_SECRET_CLIENTE,
} from "../utils/auth.js";

const { EMPLEADO, CLIENTE, ROL } = db;

// ============================================================
// LOGIN DE EMPLEADOS / ADMIN
// POST /api/auth/login-admin
// ============================================================
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({
        estado: false,
        mensaje: "Email y contraseña son requeridos",
      });
    }

    const empleado = await EMPLEADO.scope("conPassword").findOne({
      where: { email: email.trim() },
      include: [{ model: ROL, as: "ROL" }],
    });

    if (!empleado) {
      return res.status(401).json({
        estado: false,
        mensaje: "Credenciales inválidas",
      });
    }

    const hashRegistrado = empleado.password;
    if (!hashRegistrado) {
      return res.status(500).json({
        estado: false,
        mensaje: "Error de configuración: usuario sin contraseña",
      });
    }

    const esValida = await compararPassword(password, hashRegistrado);
    if (!esValida) {
      return res.status(401).json({
        estado: false,
        mensaje: "Credenciales inválidas",
      });
    }

    // Rol en minúscula para estandarizar
    const rolNombre = (empleado.ROL?.nombre || "staff").toLowerCase();

    const token = generarToken(
      { id: empleado.id, tipo: "admin", rol: rolNombre },
      JWT_SECRET_ADMIN
    );

    res.json({
      estado: true,
      token,
      usuario: {
        id: empleado.id,
        nombre: empleado.nombre,
        email: empleado.email,
        rol: rolNombre,
        rolId: empleado.ROL?.id ?? null,
        tipo: "admin",
      },
    });
  } catch (error) {
    console.error("Error en loginAdmin:", error);
    res.status(500).json({
      estado: false,
      mensaje: "Error al iniciar sesión",
    });
  }
};

// ============================================================
// LOGIN DE CLIENTES
// POST /api/auth/login
// POST /api/auth/cliente/login
// ============================================================
export const loginCliente = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    // Validación de entrada
    const emailValido =
      typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const passwordValido = typeof password === "string" && password.length > 0;

    if (!emailValido || !passwordValido) {
      return res.status(400).json({
        estado: false,
        mensaje: "Email o contraseña con formato inválido",
      });
    }

    const cliente = await CLIENTE.scope("conPassword").findOne({
      where: { email: email.trim() },
    });

    // Mismo mensaje si no existe o si la contraseña es incorrecta (no leak)
    const esValida = cliente && (await compararPassword(password, cliente.password));
    if (!esValida) {
      return res.status(401).json({
        estado: false,
        mensaje: "Credenciales inválidas",
      });
    }

    const token = generarToken(
      { id: cliente.id, tipo: "cliente", rol: "client" },
      JWT_SECRET_CLIENTE
    );

    res.json({
      estado: true,
      token,
      usuario: {
        id: cliente.id,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
        rol: "client",
        tipo: "cliente",
      },
    });
  } catch (error) {
    console.error("Error en loginCliente:", error);
    res.status(500).json({
      estado: false,
      mensaje: "Error al iniciar sesión",
    });
  }
};

// Alias para mantener compatibilidad con /auth/login
export const login = loginCliente;

// ============================================================
// GET /api/auth/me
// Requiere token válido (cliente o admin)
// ============================================================
export const me = async (req, res) => {
  try {
    const { id, tipo } = req.user || {};
    if (!id) {
      return res.status(401).json({
        estado: false,
        mensaje: "Token inválido",
      });
    }

    // Si es admin
    if (tipo === "admin") {
      const empleado = await EMPLEADO.findByPk(id, {
        include: [{ model: ROL, as: "ROL" }],
      });
      if (!empleado) {
        return res.status(401).json({
          estado: false,
          mensaje: "La sesión ya no es válida",
        });
      }
      return res.json({
        estado: true,
        usuario: {
          id: empleado.id,
          nombre: empleado.nombre,
          email: empleado.email,
          rol: (empleado.ROL?.nombre || "staff").toLowerCase(),
          rolId: empleado.ROL?.id ?? null,
          tipo: "admin",
        },
      });
    }

    // Si es cliente (default)
    const cliente = await CLIENTE.findByPk(id);
    if (!cliente) {
      return res.status(401).json({
        estado: false,
        mensaje: "La sesión ya no es válida",
      });
    }
    res.json({
      estado: true,
      usuario: {
        id: cliente.id,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        rol: "client",
        tipo: "cliente",
      },
    });
  } catch (error) {
    console.error("Error en /auth/me:", error);
    res.status(500).json({
      estado: false,
      mensaje: "Error al obtener el usuario",
    });
  }
};

// ============================================================
// POST /api/auth/forgot-password
// ============================================================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ estado: false, mensaje: "El email es obligatorio" });
    }

    const cliente = await CLIENTE.findOne({ where: { email: email.trim() } });
    if (!cliente) {
      return res.status(404).json({ estado: false, mensaje: "No existe una cuenta con ese email" });
    }

    // 1. Generar token único
    const token = crypto.randomBytes(32).toString("hex");

    // 2. Guardar token y fecha de expiración (1 hora)
    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 1);

    cliente.resetToken = token;
    cliente.resetTokenExpira = expiracion;
    await cliente.save();

    // 3. Enviar mail con el link
    await enviarRecuperacionPassword(cliente, token);

    res.json({ estado: true, mensaje: "Mail de recuperación enviado. Revisá tu bandeja de entrada." });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    res.status(500).json({ estado: false, mensaje: "Error al procesar la solicitud" });
  }
};

// ============================================================
// POST /api/auth/reset-password
// ============================================================
export const resetPassword = async (req, res) => {
  try {
    const { token, nuevaPassword } = req.body;
    if (!token || !nuevaPassword) {
      return res.status(400).json({ estado: false, mensaje: "Token y contraseña son obligatorios" });
    }
    if (nuevaPassword.length < 6) {
      return res.status(400).json({ estado: false, mensaje: "La contraseña debe tener al menos 6 caracteres" });
    }

    // 1. Buscar cliente por token y validar que no haya expirado
    const cliente = await CLIENTE.findOne({
      where: {
        resetToken: token,
        resetTokenExpira: { [Op.gt]: new Date() }
      },
    });

    if (!cliente) {
      return res.status(400).json({ estado: false, mensaje: "Token inválido o expirado" });
    }

    // 2. Encriptar y actualizar la contraseña
    cliente.password = await encriptarPassword(nuevaPassword);
    
    // 3. Limpiar el token
    cliente.resetToken = null;
    cliente.resetTokenExpira = null;
    await cliente.save();

    res.json({ estado: true, mensaje: "Contraseña actualizada correctamente. Ya podés iniciar sesión." });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({ estado: false, mensaje: "Error al procesar la solicitud" });
  }
};