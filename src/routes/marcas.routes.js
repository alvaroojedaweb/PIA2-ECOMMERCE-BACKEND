import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  softDelete,
  hardDelete
} from '../controllers/marca.controllers.js';

const marcaRoutes = Router();
const root = "marcas"

marcaRoutes.get(`/${root}/`, getAll);
marcaRoutes.get(`/${root}/:id`, get);
marcaRoutes.post(`/${root}/`, create);
marcaRoutes.put(`/${root}/:id`, update);
//marcaRoutes.delete(`/${root}/:id`, softDelete);
marcaRoutes.delete(`/${root}/:id/hard`, hardDelete);
 
export default marcaRoutes;