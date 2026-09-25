import db from '../models/index.model.js';
const { EMPLEADO, CLIENTE, ROL } = db;
import {
  compararPassword,
  generarToken,
  JWT_SECRET_ADMIN,
  JWT_SECRET_CLIENTE,
} from '../utils/auth.js';

// Login de Empleados / Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const empleado = await EMPLEADO.scope('conPassword').findOne({
  where: { email },
  include: [{ model: ROL, as: 'ROL' }]
});
    if (!empleado) {
      return res.status(404).json({ estado: false, mensaje: 'Empleado no encontrado' });
    }

    // Se busca la propiedad 'contraseña' o 'password' según el modelo
    const hashRegistrado = empleado.contraseña || empleado.password;

    if (!hashRegistrado || !password) {
      return res.status(400).json({ 
        estado: false, 
        mensaje: 'La contraseña enviada o registrada no es válida' 
      });
    }

    const esValida = await compararPassword(password, hashRegistrado);
    if (!esValida) {
      return res.status(401).json({ estado: false, mensaje: 'Contraseña incorrecta' });
    }

    const token = generarToken(
  { id: empleado.id, rol: empleado.ROL?.nombre || empleado.rol },
  JWT_SECRET_ADMIN
  );

    res.json({
      estado: true,
      mensaje: 'Login de empleado/admin exitoso',
      token,
      usuario: {
        id: empleado.id,
        nombre: empleado.nombre,
        email: empleado.email,
        rol: empleado.ROL?.nombre || null,
        rolId: empleado.ROL?.id || null,
      },
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: 'Error en login de empleado', error: error.message });
  }
};

export const loginCliente = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        estado: false,
        mensaje: 'Email y contraseña son requeridos'
      });
    }

    const cliente = await CLIENTE.scope('conPassword').findOne({ where: { email } });
    if (!cliente) {
      return res.status(404).json({
        estado: false,
        mensaje: 'Cliente no encontrado'
      });
    }

    const hashRegistrado = cliente.contraseña || cliente.password;

    const esValida = await compararPassword(password, hashRegistrado);
    if (!esValida) {
      return res.status(401).json({
        estado: false,
        mensaje: 'Contraseña incorrecta'
      });
    }

    const token = generarToken(
      { id: cliente.id, tipo: 'cliente' },
      JWT_SECRET_CLIENTE || JWT_SECRET_ADMIN
    );

    res.json({
      estado: true,
      mensaje: 'Login de cliente exitoso',
      token,
      data: {
        id: cliente.id,
        nombre: cliente.nombre,
        email: cliente.email,
        tipo: 'cliente'
      }
    });
  } catch (error) {
    res.status(500).json({
      estado: false,
      mensaje: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

// POST /api/auth/login  (clientes)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    // Validación de tipo y formato antes de tocar la base de datos
    const emailValido = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const passwordValido = typeof password === 'string' && password.length > 0;

    if (!emailValido || !passwordValido) {
      return res.status(400).json({
        estado: false,
        mensaje: 'Email o contraseña con formato inválido'
      });
    }

    const cliente = await CLIENTE.scope('conPassword').findOne({ where: { email: email.trim() } });

    const esValida = cliente && (await compararPassword(password, cliente.password));
    if (!esValida) {
      return res.status(401).json({ estado: false, mensaje: 'Credenciales inválidas' });
    }

    const token = generarToken(
      { id: cliente.id, tipo: 'cliente', rol: 'client' },
      JWT_SECRET_CLIENTE
    );

    res.json({
      estado: true,
      token,
      usuario: { id: cliente.id, nombre: cliente.nombre, email: cliente.email, rol: 'client' },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al iniciar sesión' });
  }
};

// GET /api/auth/me  (requiere verificarCliente)
export const me = async (req, res) => {
  try {
    const id = req.user?.id;
    if (!id) {
      return res.status(401).json({ estado: false, mensaje: 'Token inválido' });
    }

    const cliente = await CLIENTE.findByPk(id);

    if (!cliente) {
      return res.status(401).json({ estado: false, mensaje: 'La sesión ya no es válida' });
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
        rol: 'client',
      },
    });
  } catch (error) {
    console.error('Error en /auth/me:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al obtener el usuario' });
  }
};