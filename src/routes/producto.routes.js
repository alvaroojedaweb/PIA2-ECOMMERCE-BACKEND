import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  softDelete,
  hardDelete
} from '../controllers/producto.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const productoRoutes = Router();

// Rutas públicas (cualquiera o cliente puede ver los productos)
productoRoutes.get('/', getAll);
productoRoutes.get('/:id', get);

// Rutas protegidas solo para administradores
productoRoutes.post('/', verificarAdmin, create);
productoRoutes.put('/:id', verificarAdmin, update);
productoRoutes.delete('/:id/hard', verificarAdmin, hardDelete);
 
export default productoRoutes;