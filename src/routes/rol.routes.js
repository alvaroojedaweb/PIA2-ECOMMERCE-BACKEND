import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  hardDelete
} from '../controllers/rol.controllers.js';
import { verificarAdmin } from '../middleware/auth.js';

const rolRoutes = Router();

// Rutas protegidas solo para administradores/empleados
rolRoutes.get('/', verificarAdmin, getAll);
rolRoutes.get('/:id', verificarAdmin, get);
rolRoutes.post('/', verificarAdmin, create);
rolRoutes.put('/:id', verificarAdmin, update);
rolRoutes.delete('/:id/hard', verificarAdmin, hardDelete);

export default rolRoutes;