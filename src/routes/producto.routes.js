import { Router } from 'express';
import {
  getAll,
  getAllWithPagination,
  get,
  create,
  update,
  softDelete,
  hardDelete
} from '../controllers/producto.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';   // ← NUEVO

const productoRoutes = Router();

// Rutas públicas
productoRoutes.get('/', getAllWithPagination);
productoRoutes.get('/:id', get);

// Rutas protegidas (admin)
// POST acepta hasta 5 imágenes en el campo "imagenes"
productoRoutes.post(
  '/',
  verificarAdmin,
  upload.array('imagenes', 5),   // ← NUEVO
  create
);
productoRoutes.put('/:id', verificarAdmin, update);
productoRoutes.delete('/:id/hard', verificarAdmin, hardDelete);

export default productoRoutes;