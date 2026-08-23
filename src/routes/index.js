/*/ src/routes/index.js
import { Router } from 'express';
import productoRoutes from './productos.routes.js';
import ordenCompraRoutes from './ordenCompraRoutes.js';
import itemOrdenCompraRoutes from './itemOrdenCompraRoutes.js';

const router = Router();

// Agrupar todas las rutas
router.use('/productos', productoRoutes);
router.use('/clientes', ordenCompraRoutes);
router.use('/cliente', itemOrdenCompraRoutes);

// También puedes mantener las rutas directas si prefieres
 router.use('/', productoRoutes);
 router.use('/', ordenCompraRoutes);
router.use('/', itemOrdenCompraRoutes);

export default router;*/

// src/routes/index.js

import { Router } from 'express';

import clientesRoutes from './clientes.Routes.js';
import productoRoutes from './productos.routes.js';
import ordenCompraRoutes from './ordenCompra.Routes.js';
import itemOrdenCompraRoutes from './itemOrdenCompra.Routes.js';

const router = Router();

// ================================
// CLIENTES
// ================================
router.use('/clientes', clientesRoutes);

// ================================
// PRODUCTOS
// ================================
router.use('/productos', productoRoutes);

// ================================
// ÓRDENES DE COMPRA
// ================================
router.use('/ordenes', ordenCompraRoutes);

// ================================
// ITEMS DE ÓRDENES
// ================================
router.use('/items-orden', itemOrdenCompraRoutes);

export default router;