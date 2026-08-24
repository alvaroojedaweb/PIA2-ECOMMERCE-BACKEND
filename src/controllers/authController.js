import { EMPLEADO } from '../models/index.model.js';
import Cliente from '../models/clientes.model.js';
import {
  compararPassword,
  generarToken,
  JWT_SECRET_ADMIN,
  JWT_SECRET_CLIENTE,
} from '../utils/auth.js';

// Login de Empleados / Admin
export const loginAdmin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const empleado = await EMPLEADO.findOne({ where: { Email } });
    if (!empleado) {
      return res.status(404).json({ estado: false, mensaje: 'Empleado no encontrado' });
    }

    const hashPassword = empleado.Contraseña || empleado.password || empleado.Clave;

    if (!hashPassword || !Password) {
      return res.status(400).json({ 
        estado: false, 
        mensaje: 'La contraseña enviada o registrada no es válida' 
      });
    }

    const esValida = await compararPassword(Password, hashPassword);
    if (!esValida) {
      return res.status(401).json({ estado: false, mensaje: 'Contraseña incorrecta' });
    }

    const token = generarToken(
      { id: empleado.EmpleadoPKID || empleado.id, tipo: 'admin' },
      JWT_SECRET_ADMIN
    );

    res.json({
      estado: true,
      mensaje: 'Login de empleado/admin exitoso',
      token,
      usuario: {
        id: empleado.EmpleadoPKID || empleado.id,
        nombre: empleado.Nombre,
        email: empleado.Email,
        tipo: 'admin',
      },
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: 'Error en login de empleado', error: error.message });
  }
};

// Login de Cliente
export const loginCliente = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        estado: false,
        mensaje: 'Email y contraseña son requeridos'
      });
    }

    const cliente = await Cliente.findOne({ where: { email } });

    if (!cliente) {
      return res.status(404).json({
        estado: false,
        mensaje: 'Cliente no encontrado'
      });
    }

    // Usamos el helper compararPassword en vez de bcrypt directo
    const esValida = await compararPassword(password, cliente.password);
    if (!esValida) {
      return res.status(401).json({
        estado: false,
        mensaje: 'Contraseña incorrecta'
      });
    }

    // Usamos el helper generarToken
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