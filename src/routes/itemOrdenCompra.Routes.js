/*// src/routes/itemOrdenCompra.Routes.js
import express from'express';
import itemOrdenCompraController from'../controllers/itemOrdenCompra.Controller.js';
const router = express.Router();

// GET /clientes/:id_cliente/ordenes/:id_orden/items
router.get('/clientes/:id_cliente/ordenes/:id_orden/items', itemOrdenCompraController.getItemsByOrden);

// GET /clientes/:id_cliente/ordenes/:id_orden/items/:id_item
router.get('/clientes/:id_cliente/ordenes/:id_orden/items/:id_item', itemOrdenCompraController.getItemById);

// POST /clientes/:id_cliente/ordenes/:id_orden/items
router.post('/clientes/:id_cliente/ordenes/:id_orden/items', itemOrdenCompraController.createItem);

// PUT /clientes/:id_cliente/ordenes/:id_orden/items/:id_item
router.put('/clientes/:id_cliente/ordenes/:id_orden/items/:id_item', itemOrdenCompraController.updateItem);

// DELETE /clientes/:id_cliente/ordenes/:id_orden/items/:id_item/hard
router.delete('/clientes/:id_cliente/ordenes/:id_orden/items/:id_item/hard', itemOrdenCompraController.deleteItem);

export default router;*/
// src/routes/itemOrdenCompra.Routes.js

import express from 'express';

import {
  getItemsByOrden,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/itemOrdenCompra.Controller.js';

const router = express.Router();

// GET /clientes/:id_cliente/ordenes/:id_orden/items
router.get(
  '/clientes/:id_cliente/ordenes/:id_orden/items',
  getItemsByOrden
);

// GET /clientes/:id_cliente/ordenes/:id_orden/items/:id_item
router.get(
  '/clientes/:id_cliente/ordenes/:id_orden/items/:id_item',
  getItemById
);

// POST /clientes/:id_cliente/ordenes/:id_orden/items
router.post(
  '/clientes/:id_cliente/ordenes/:id_orden/items',
  createItem
);

// PUT /clientes/:id_cliente/ordenes/:id_orden/items/:id_item
router.put(
  '/clientes/:id_cliente/ordenes/:id_orden/items/:id_item',
  updateItem
);

// DELETE /clientes/:id_cliente/ordenes/:id_orden/items/:id_item
router.delete(
  '/clientes/:id_cliente/ordenes/:id_orden/items/:id_item',
  deleteItem
);

export default router;