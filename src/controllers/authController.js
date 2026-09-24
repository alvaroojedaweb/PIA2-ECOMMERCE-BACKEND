import db from '../models/index.model.js';
const { EMPLEADO, CLIENTE } = db;
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

    const empleado = await EMPLEADO.findOne({ where: { email } });
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
      { id: empleado.id, rol: empleado.rol },
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
        rol: empleado.rol,
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
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return res.status(400).json({ estado: false, mensaje: 'Email y contraseña son requeridos' });
    }

    // scope('conPassword'): el modelo oculta el hash por defecto y aquí sí lo necesitamos
    const cliente = await CLIENTE.scope('conPassword').findOne({ where: { email } });

    // Un único mensaje para "no existe" y "clave incorrecta": así nadie puede
    // averiguar qué emails están registrados.
    const esValida = cliente && (await compararPassword(password, cliente.password));
    if (!esValida) {
      return res.status(401).json({ estado: false, mensaje: 'Credenciales inválidas' });
    }

    const token = generarToken(
      { id: cliente.id, tipo: 'cliente', rol: 'client' },
      JWT_SECRET_CLIENTE
    );

    // La clave es "usuario" y NO "data": el interceptor de Axios del frontend
    // devuelve solo el contenido de "data" y se perdería el token.
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
    // El id sale del token ya validado, nunca de la URL ni del body
    const cliente = await CLIENTE.findByPk(req.user.id);

    // Token válido pero el cliente ya no existe: 401 para que el frontend cierre la sesión
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