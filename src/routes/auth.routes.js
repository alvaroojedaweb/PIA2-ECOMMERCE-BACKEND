import { Router } from 'express';
import { loginAdmin, loginCliente } from '../controllers/authController.js';

const router = Router();

router.post('/login-cliente', loginCliente);

router.post('/login-admin', loginAdmin);

export default router;