import { Router } from "express";
import {
  loginCliente,
  loginAdmin,
  me,
   forgotPassword, 
  resetPassword,  

} from "../controllers/authController.js";
import { crear } from "../controllers/cliente.controllers.js";
import { verificarClienteOAdmin } from "../middleware/auth.js";

const router = Router();

// Registro de clientes
router.post("/register", crear);

// Login de clientes (dos rutas para compatibilidad con el frontend)
router.post("/login", loginCliente);
router.post("/cliente/login", loginCliente);

// Login de empleados / admin
router.post("/login-admin", loginAdmin);

// Perfil del usuario logueado (cliente o admin)
router.get("/me", verificarClienteOAdmin, me);

// Recuperación de contraseña
router.post("/forgot-password", forgotPassword); 
router.post("/reset-password", resetPassword);   

export default router;