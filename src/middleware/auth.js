import jwt from "jsonwebtoken";
import { JWT_SECRET_CLIENTE, JWT_SECRET_ADMIN } from "../utils/auth.js";

// ============================================================
// Middleware base: extrae y verifica un JWT con un secret dado
// ============================================================
export const verificarToken = (secret) => (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        estado: false,
        mensaje: "No se proporcionó un token de autenticación",
      });
    }

    const token = authHeader.slice(7).trim(); // más robusto que split
    const payload = jwt.verify(token, secret);

    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({
      estado: false,
      mensaje: "Token inválido o expirado",
    });
  }
};

// ============================================================
// Middleware para clientes
// Requiere: token firmado con JWT_SECRET_CLIENTE y tipo === 'cliente'
// ============================================================
export const verificarCliente = (req, res, next) => {
  verificarToken(JWT_SECRET_CLIENTE)(req, res, (err) => {
    if (err) return next(err);

    const esCliente = req.user && req.user.tipo === "cliente";

    if (!esCliente) {
      return res.status(403).json({
        estado: false,
        mensaje: "Acceso reservado únicamente para clientes",
      });
    }

    next();
  });
};

// ============================================================
// Middleware para administradores
// Requiere: token firmado con JWT_SECRET_ADMIN y tipo === 'admin'
// y rol === 'admin' para operaciones de escritura (CUD).
// El rol 'staff' puede leer pero no escribir.
// ============================================================
export const verificarAdmin = (req, res, next) => {
  verificarToken(JWT_SECRET_ADMIN)(req, res, (err) => {
    if (err) return next(err);

    const esAdmin = req.user && req.user.tipo === "admin";

    if (!esAdmin) {
      return res.status(403).json({
        estado: false,
        mensaje: "Acceso reservado únicamente para administradores",
      });
    }

    // Solo rol 'admin' (no 'staff') para operaciones de escritura
    const rolAdmin = req.user.rol === "admin";

    if (!rolAdmin) {
      return res.status(403).json({
        estado: false,
        mensaje: "Se requiere rol de administrador para esta operación",
      });
    }

    next();
  });
};

// ============================================================
// Middleware que acepta cliente O admin (útil para /auth/me)
// Intenta con el secret de cliente y, si falla, con el de admin.
// ============================================================
export const verificarClienteOAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      estado: false,
      mensaje: "No se proporcionó un token de autenticación",
    });
  }

  const token = authHeader.slice(7).trim();

  // Intentar con secret de cliente
  try {
    const payload = jwt.verify(token, JWT_SECRET_CLIENTE);
    req.user = payload;
    return next();
  } catch (e) {
    // Si falla, intentar con secret de admin
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET_ADMIN);
    req.user = payload;
    return next();
  } catch (e) {
    return res.status(401).json({
      estado: false,
      mensaje: "Token inválido o expirado",
    });
  }
};