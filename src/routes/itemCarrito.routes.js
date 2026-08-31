import { Router } from 'express';
import {
  obtenerCarritoCliente,
  obtenerItemCarrito,
  agregarAlCarrito,
  actualizarItemCarrito,
  eliminarItemCarrito
} from '../controllers/itemCarrito.controllers.js';

const router = Router();

router.get('/cliente/:id_cliente', obtenerCarritoCliente);
router.get('/:id_item', obtenerItemCarrito);
router.post('/cliente/:id_cliente', agregarAlCarrito);
router.put('/:id_item', actualizarItemCarrito);
router.delete('/:id_item/hard', eliminarItemCarrito);

export default router;