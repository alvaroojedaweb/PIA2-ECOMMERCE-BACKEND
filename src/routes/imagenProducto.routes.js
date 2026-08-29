import { Router } from 'express';
import {
  getAllByProducto,
  getById,
  create,
  update,
  hardDelete
} from '../controllers/imagenProducto.controllers.js';

const router = Router();

router.get('/producto/:id_producto', getAllByProducto);
router.get('/:id_imagen', getById);
router.post('/', create);
router.put('/:id_imagen', update);
router.delete('/:id_imagen/hard', hardDelete);

export default router;