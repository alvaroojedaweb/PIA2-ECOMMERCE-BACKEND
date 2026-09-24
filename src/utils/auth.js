import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

// Falla al arrancar si falta la variable, en vez de usar un secreto público.
// Depende de que db.config.js cargue el .env antes de importar este archivo.
const exigir = (nombre) => {
  const v = process.env[nombre];
  if (!v) throw new Error(`Falta la variable de entorno ${nombre}`);
  return v;
};
export const JWT_SECRET_ADMIN = exigir('JWT_SECRET_ADMIN');
export const JWT_SECRET_CLIENTE = exigir('JWT_SECRET_CLIENTE');

export const encriptarPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const compararPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generarToken = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};