import { Router } from 'express';
import {
  getAllByProducto,
  getById,
  create,
  update,
  hardDelete
} from '../controllers/imagenProducto.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/producto/:id_producto', getAllByProducto);
router.get('/:id_imagen', getById);
router.post('/producto/:id_producto', verificarAdmin, create);
router.put('/:id_imagen', verificarAdmin, update);
router.delete('/:id_imagen/hard', verificarAdmin, hardDelete);

export default router;