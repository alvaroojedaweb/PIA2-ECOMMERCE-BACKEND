import { Router } from 'express';
import authRoutes from './auth.routes.js';
import clienteRoutes from './cliente.routes.js';
import empleadoRoutes from './empleado.routes.js';
import imagenProductoRoutes from './imagenProducto.routes.js';
import marcaRoutes from './marca.routes.js';
import modeloRoutes from './modelo.routes.js';
import productoRoutes from './producto.routes.js';
import itemCarritoRoutes from './itemCarrito.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/clientes', clienteRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/imagenes-producto', imagenProductoRoutes);
router.use('/marcas', marcaRoutes);
router.use('/modelos', modeloRoutes);
router.use('/productos', productoRoutes);
router.use('/carrito', itemCarritoRoutes);

export default router;