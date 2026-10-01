import db from "../models/index.model.js";
const { EMPLEADO, CLIENTE, ROL } = db;
import {
  compararPassword,
  generarToken,
  JWT_SECRET_ADMIN,
  JWT_SECRET_CLIENTE,
} from "../utils/auth.js";

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