import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  hardDelete
} from '../controllers/modelo.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const modeloRoutes = Router();

// Rutas pUblicas
modeloRoutes.get('/', getAll);
modeloRoutes.get('/:id', get);
// Rutas protegidas
modeloRoutes.post('/', verificarAdmin, create);
modeloRoutes.put('/:id', verificarAdmin, update);
modeloRoutes.delete('/:id/hard', verificarAdmin, hardDelete);


export default modeloRoutes;