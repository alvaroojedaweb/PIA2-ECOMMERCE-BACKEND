import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  hardDelete
} from '../controllers/marca.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const marcaRoutes = Router();
// Rutas públicas
marcaRoutes.get('/', getAll);
marcaRoutes.get('/:id', get);
// Rutas protegidas solo para administradores/empleados
marcaRoutes.post('/', verificarAdmin, create);
marcaRoutes.put('/:id', verificarAdmin, update);
marcaRoutes.delete('/:id/hard', verificarAdmin, hardDelete);

export default marcaRoutes;