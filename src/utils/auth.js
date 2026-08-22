import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export const JWT_SECRET_CLIENT = process.env.JWT_SECRET_CLIENT || 'secreto_ecommerce_cliente_2026';
export const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN || 'secreto_ecommerce_admin_2026';

export const encriptarPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const compararPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generarToken = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};