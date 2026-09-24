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

// Todas las rutas de carrito exigen autenticación de cliente
router.use(verificarCliente);

router.get('/', obtenerCarritoCliente);
router.get('/:id_item', obtenerItemCarrito);
router.post('/', agregarAlCarrito);
router.put('/:id_item', actualizarItemCarrito);
router.delete('/:id_item', eliminarItemCarrito);

export default router;