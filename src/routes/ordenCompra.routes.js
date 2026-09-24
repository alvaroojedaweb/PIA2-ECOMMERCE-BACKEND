import { Router } from 'express';
import { getAll, getById, create, update } from '../controllers/ordenCompra.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', verificarAdmin, getAll);
router.get('/:id', verificarAdmin, getById);
router.post('/', verificarAdmin, create);
router.put('/:id', verificarAdmin, update);

export default router;