import { Router } from 'express';
import { loginCliente, loginAdmin,  login, me  } from '../controllers/authController.js';
import { crear } from '../controllers/cliente.controllers.js';
import { verificarCliente } from '../middleware/auth.js';

const router = Router();

router.post('/register', crear);

router.post('/login', login);                   
router.get('/me', verificarCliente, me);         

router.post('/cliente/login', loginCliente);

router.post('/login-admin', loginAdmin);

export default router;