import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  softDelete,
  hardDelete
} from '../controllers/producto.controllers.js';

const productoRoutes = Router();

productoRoutes.get('/', getAll);
productoRoutes.get('/:id', get);
productoRoutes.post('/', create);
productoRoutes.put('/:id', update);
// productoRoutes.delete('/:id', softDelete);
productoRoutes.delete('/:id/hard', hardDelete);
 
export default productoRoutes;