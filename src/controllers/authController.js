import db from '../models/index.model.js';
const { EMPLEADO, CLIENTE } = db;
import {compararPassword,
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

    if (!empleado.password || !password) {
      return res.status(400).json({ 
        estado: false, 
        mensaje: 'La contraseña enviada o registrada no es válida' 
      });
    }

    const esValida = await compararPassword(password, empleado.password);
    if (!esValida) {
      return res.status(401).json({ estado: false, mensaje: 'Contraseña incorrecta' });
    }

    const token = generarToken(
      { id: empleado.id, tipo: 'admin' },
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
        tipo: 'admin',
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

    const cliente = await CLIENTE.findOne({ where: { email } });

    if (!cliente) {
      return res.status(404).json({
        estado: false,
        mensaje: 'Cliente no encontrado'
      });
    }

    
    const esValida = await compararPassword(password, cliente.password);
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