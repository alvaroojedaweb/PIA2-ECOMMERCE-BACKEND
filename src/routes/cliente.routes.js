import { Router } from 'express';
import {
  obtener,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
} from '../controllers/cliente.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', verificarAdmin, obtener);
router.get('/:id', verificarAdmin, obtenerPorId);
router.post('/', verificarAdmin, crear);
router.put('/:id', verificarAdmin, actualizar);
router.delete('/:id', verificarAdmin, eliminar);

export default router;