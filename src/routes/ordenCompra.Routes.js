// src/routes/ordenCompra.Routes.js

import express from 'express';

import {
  getOrdenesByCliente,
  getOrdenById,
  createOrden,
  updateOrden,
  deleteOrden
} from '../controllers/ordenCompra.Controller.js';

const router = express.Router();

// GET /clientes/:id_cliente/ordenes
router.get(
  '/clientes/:id_cliente/ordenes',
  getOrdenesByCliente
);

// GET /clientes/:id_cliente/ordenes/:id_orden
router.get(
  '/clientes/:id_cliente/ordenes/:id_orden',
  getOrdenById
);

// POST /clientes/:id_cliente/ordenes
router.post(
  '/clientes/:id_cliente/ordenes',
  createOrden
);

// PUT /clientes/:id_cliente/ordenes/:id_orden
router.put(
  '/clientes/:id_cliente/ordenes/:id_orden',
  updateOrden
);

// DELETE /clientes/:id_cliente/ordenes/:id_orden
router.delete(
  '/clientes/:id_cliente/ordenes/:id_orden',
  deleteOrden
);

export default router;