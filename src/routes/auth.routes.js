import { Router } from 'express';
import { loginCliente, loginAdmin } from '../controllers/authController.js';

const router = Router();

// POST /auth/cliente/login -> Login para clientes
router.post('/auth/cliente/login', loginCliente);

// POST /auth/admin/login -> Login para empleados / admins
router.post('/auth/admin/login', loginAdmin);

export default router;