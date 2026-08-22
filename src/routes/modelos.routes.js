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
const a = "marca"
const b = "modelo"

modeloRoutes.get(`/${a}s/:id_${a}/${b}s`, getAll);
modeloRoutes.get(`/${a}s/:id_${a}/${b}s/:id_${b}`, get);
modeloRoutes.post(`/${a}s/:id_${a}/${b}s`, create);
modeloRoutes.put(`/${a}s/:id_${a}/${b}s/:id_${b}`, update);
//modeloRoutes.delete(`/${root}/:id`, softDelete);
modeloRoutes.delete(`/${a}s/:id_${a}/${b}s/:id_${b}/hard`, hardDelete);
 
export default modeloRoutes;