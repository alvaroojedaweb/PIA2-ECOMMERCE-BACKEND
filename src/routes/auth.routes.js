import { Router } from 'express';
import { loginCliente, loginAdmin } from '../controllers/authController.js';
import { crear } from '../controllers/clientes.Controllers.js';

const router = Router();

router.post('/register', crear);
router.post('/login', loginCliente);

// POST /auth/cliente/login -> Login para clientes
router.post('/cliente/login', loginCliente);

router.post('/login-admin', loginAdmin);

export default router;