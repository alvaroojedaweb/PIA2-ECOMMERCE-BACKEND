import { Router } from 'express';
import {
  getAll,
  get,
  create,
  update,
  hardDelete
} from '../controllers/empleado.controllers.js';

const empleadoRoutes = Router();
const root = "empleados";

empleadoRoutes.get(`/${root}`, getAll);
empleadoRoutes.get(`/${root}/:id_empleado`, get);
empleadoRoutes.post(`/${root}`, create);
empleadoRoutes.put(`/${root}/:id_empleado`, update);
empleadoRoutes.delete(`/${root}/:id_empleado/hard`, hardDelete);

export default empleadoRoutes;