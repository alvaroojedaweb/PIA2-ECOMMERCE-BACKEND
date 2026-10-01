import { Router } from 'express';
import { getAll, get, create, update, hardDelete } from '../controllers/categoria.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const router = Router();

// Rutas públicas (el catálogo necesita listar categorías)
router.get('/', getAll);
router.get('/:id', get);

// Rutas protegidas solo para administradores
router.post('/', verificarAdmin, create);
router.put('/:id', verificarAdmin, update);
router.delete('/:id/hard', verificarAdmin, hardDelete);

export default router;