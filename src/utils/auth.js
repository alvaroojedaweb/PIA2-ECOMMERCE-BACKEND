import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN || 'secreto_admin';
export const JWT_SECRET_CLIENTE = process.env.JWT_SECRET_CLIENTE || 'secreto_cliente';

export const encriptarPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const compararPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generarToken = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};