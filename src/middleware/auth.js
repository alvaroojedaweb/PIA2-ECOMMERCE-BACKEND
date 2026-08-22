import jwt from 'jsonwebtoken';
import { JWT_SECRET_CLIENT, JWT_SECRET_ADMIN } from '../utils/auth.js';
import { EMPLEADO } from '../models/index.model.js';

export const verificarToken = (secret) => (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        estado: false,
        mensaje: 'No se proporcionó un token de autenticación',
      });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, secret);

    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      estado: false,
      mensaje: 'Token inválido o expirado',
      error: error.message,
    });
  }
};

export const verificarCliente = (req, res, next) => {
  verificarToken(JWT_SECRET_CLIENT)(req, res, async (err) => {
    if (err) return next(err);

    try {
      if (!req.user || req.user.tipo !== 'cliente') {
        return res.status(403).json({
          estado: false,
          mensaje: 'Acceso solo para clientes',
        });
      }

      const cliente = await CLIENTE.findByPk(req.user.id);
      if (!cliente) {
        return res.status(403).json({
          estado: false,
          mensaje: 'Cliente no encontrado',
        });
      }

      req.cliente = cliente;
      next();
    } catch (error) {
      return res.status(500).json({
        estado: false,
        mensaje: 'Error al verificar cliente',
        error: error.message,
      });
    }
  });
};

export const verificarAdmin = (req, res, next) => {
  verificarToken(JWT_SECRET_ADMIN)(req, res, async (err) => {
    if (err) return next(err);

    try {
      if (!req.user || req.user.tipo !== 'admin') {
        return res.status(403).json({
          estado: false,
          mensaje: 'Acceso solo para administradores/empleados',
        });
      }

      const empleado = await EMPLEADO.findByPk(req.user.id);
      if (!empleado) {
        return res.status(403).json({
          estado: false,
          mensaje: 'Empleado no encontrado',
        });
      }

      req.empleado = empleado;
      next();
    } catch (error) {
      return res.status(500).json({
        estado: false,
        mensaje: 'Error al verificar empleado',
        error: error.message,
      });
    }
  });
};