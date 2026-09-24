import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  hardDelete
} from '../controllers/empleado.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const router = Router();


router.get('/', verificarAdmin, getAll);
router.get('/:id_empleado', verificarAdmin, get);
router.post('/', verificarAdmin, create);
router.put('/:id_empleado', verificarAdmin, update);
router.delete('/:id_empleado', verificarAdmin, hardDelete);

export default router;