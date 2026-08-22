import { Router } from 'express';
import {
  getAllByProducto,
  getById,
  create,
  update,
  hardDelete
} from '../controllers/imagenProducto.controllers.js';

const router = Router();

router.get('/productos/:id_producto/imagenes', getAllByProducto);
router.get('/productos/:id_producto/imagenes/:id_imagen', getById);
router.post('/productos/:id_producto/imagenes', create);
router.put('/productos/:id_producto/imagenes/:id_imagen', update);
router.delete('/productos/:id_producto/imagenes/:id_imagen/hard', hardDelete);

export default router;