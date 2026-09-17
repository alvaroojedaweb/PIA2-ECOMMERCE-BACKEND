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
rolRoutes.get('/', getAll);
rolRoutes.get('/:id', get);
rolRoutes.post('/', create);
rolRoutes.put('/:id', update);
rolRoutes.delete('/:id/hard', hardDelete);

export default rolRoutes;