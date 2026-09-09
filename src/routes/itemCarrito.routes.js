import { Router } from 'express';
import {
  obtenerCarritoCliente,
  obtenerItemCarrito,
  agregarAlCarrito,
  actualizarItemCarrito,
  eliminarItemCarrito
} from '../controllers/itemCarrito.controllers.js';
import { verificarCliente } from '../middleware/auth.js';

const router = Router();

router.get('/cliente/:id_cliente', verificarCliente, obtenerCarritoCliente);
router.get('/:id_item', verificarCliente, obtenerItemCarrito);
router.post('/cliente/:id_cliente', verificarCliente, agregarAlCarrito);
router.put('/:id_item', verificarCliente, actualizarItemCarrito);
router.delete('/:id_item/hard', verificarCliente, eliminarItemCarrito);

export default router;