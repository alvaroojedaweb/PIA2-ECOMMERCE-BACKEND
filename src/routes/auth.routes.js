import { Router } from 'express';
import { loginCliente, loginAdmin } from '../controllers/authController.js';
import { crear } from '../controllers/clientes.Controllers.js';

const router = Router();

router.post('/register', crear);
router.post('/login', loginCliente);

// POST /auth/cliente/login -> Login para clientes
router.post('/cliente/login', loginCliente);

// POST /auth/admin/login -> Login para empleados / admins
router.post('/admin/login', loginAdmin);

export default router;