import { Router } from 'express';
import {
  obtenerCarritoCliente,
  obtenerItemCarrito,
  agregarAlCarrito,
  actualizarItemCarrito,
  eliminarItemCarrito
} from '../controllers/itemCarrito.controllers.js';

const router = Router();

router.get('/clientes/:id_cliente/carrito', obtenerCarritoCliente);
router.get('/clientes/:id_cliente/carrito/:id_item', obtenerItemCarrito);
router.post('/clientes/:id_cliente/carrito', agregarAlCarrito);
router.put('/clientes/:id_cliente/carrito/:id_item', actualizarItemCarrito);
router.delete('/clientes/:id_cliente/carrito/:id_item/hard', eliminarItemCarrito);

export default router;