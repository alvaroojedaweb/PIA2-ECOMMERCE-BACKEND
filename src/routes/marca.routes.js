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

marcaRoutes.get('/', getAll);
marcaRoutes.get('/:id', get);
marcaRoutes.post('/', create);
marcaRoutes.put('/:id', update);
marcaRoutes.delete('/:id/hard', hardDelete);

export default marcaRoutes;