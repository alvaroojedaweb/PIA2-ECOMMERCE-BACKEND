import jwt from 'jsonwebtoken';
import { JWT_SECRET_CLIENTE, JWT_SECRET_ADMIN } from '../utils/auth.js';

// Middleware base para extraer y verificar firmas JWT
export const verificarToken = (secret) => (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        estado: false,
        mensaje: 'No se proporcionó un token de autenticación',
      });
    }

    // Extrae el token omitiendo la palabra 'Bearer'
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

// Middleware para clientes (solo valida el JWT)
export const verificarCliente = (req, res, next) => {
  verificarToken(JWT_SECRET_CLIENTE)(req, res, (err) => {
    if (err) return next(err);

    const esCliente = req.user && (req.user.tipo === 'cliente' || req.user.rol === 'Cliente');

    if (!esCliente) {
      return res.status(403).json({
        estado: false,
        mensaje: 'Acceso reservado únicamente para clientes del e-commerce',
      });
    }

    next();
  });
};

// Middleware para administradores / empleados (solo valida el JWT)
export const verificarAdmin = (req, res, next) => {
  verificarToken(JWT_SECRET_ADMIN)(req, res, (err) => {
    if (err) return next(err);

    const esAdmin = req.user && (req.user.rol === 'Admin' || req.user.tipo === 'admin' || req.user.rol === 'Staff');

    if (!esAdmin) {
      return res.status(403).json({
        estado: false,
        mensaje: 'Acceso reservado únicamente para administradores',
      });
    }

    next();
  });
};