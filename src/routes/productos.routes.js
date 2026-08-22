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
const root = "productos"

productoRoutes.get(`/${root}/`, getAll);
productoRoutes.get(`/${root}/:id`, get);
productoRoutes.post(`/${root}/`, create);
productoRoutes.put(`/${root}/:id`, update);
//productoRoutes.delete(`/${root}/:id`, softDelete);
productoRoutes.delete(`/${root}/:id/hard`, hardDelete);
 
export default productoRoutes;