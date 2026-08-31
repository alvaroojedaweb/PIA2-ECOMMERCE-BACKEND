import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  hardDelete
} from '../controllers/empleado.controllers.js';

const router = Router();


router.get('/', getAll);
router.get('/:id_empleado', get);
router.post('/', create);
router.put('/:id_empleado', update);
router.delete('/:id_empleado', hardDelete);

export default router;