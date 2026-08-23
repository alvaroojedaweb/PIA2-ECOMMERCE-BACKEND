import { EMPLEADO } from '../models/index.model.js';
import {
  compararPassword,
  generarToken,
  JWT_SECRET_ADMIN,
} from '../utils/auth.js';

// Login de Empleados / Admin
export const loginAdmin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const empleado = await EMPLEADO.findOne({ where: { Email } });
    if (!empleado) {
      return res.status(404).json({ estado: false, mensaje: 'Empleado no encontrado' });
    }

    // Busca la contraseña contemplando distintas opciones de nombre de columna
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

// Login de Cliente (temporalmente deshabilitado hasta tener CLIENTE en index.model.js)
export const loginCliente = async (req, res) => {
  res.status(501).json({ estado: false, mensaje: 'Login de cliente en desarrollo' });
};