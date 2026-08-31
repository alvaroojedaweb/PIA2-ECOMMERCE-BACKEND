import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  softDelete,
  hardDelete
} from '../controllers/modelo.controllers.js';

const modeloRoutes = Router();

modeloRoutes.get('/', getAll);
modeloRoutes.get('/:id', get);
modeloRoutes.post('/', create);
modeloRoutes.put('/:id', update);
// modeloRoutes.delete('/:id', softDelete);
modeloRoutes.delete('/:id/hard', hardDelete);
 
export default modeloRoutes;