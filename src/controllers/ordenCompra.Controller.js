// src/controllers/ordenCompraController.js

import OrdenCompra from '../models/ordenCompra.model.js';
import ItemOrdenCompra from '../models/itemOrdenCompra.model.js';
import Producto from '../models/productos.model.js';

// Obtener todas las órdenes de un cliente
export const getOrdenesByCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;

    const ordenes = await OrdenCompra.findAll({
      where: { cliente_id: id_cliente },
      include: [
        {
          model: ItemOrdenCompra,
          include: [Producto]
        }
      ],
      order: [['fecha', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: ordenes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las órdenes',
      error: error.message
    });
  }
};

// Obtener una orden específica
export const getOrdenById = async (req, res) => {
  try {
    const { id_cliente, id_orden } = req.params;

    const orden = await OrdenCompra.findOne({
      where: {
        orden_compra_id: id_orden,
        cliente_id: id_cliente
      },
      include: [
        {
          model: ItemOrdenCompra,
          include: [Producto]
        }
      ]
    });

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: orden
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la orden',
      error: error.message
    });
  }
};

// Crear una nueva orden
export const createOrden = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const { items, direccion_envio, notas } = req.body;

    // Validar que haya items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'La orden debe tener al menos un item'
      });
    }

    // Calcular total y verificar productos
    let total = 0;
    const itemsData = [];

    for (const item of items) {
      const producto = await Producto.findByPk(item.producto_id);

      if (!producto) {
        return res.status(404).json({
          success: false,
          message: `Producto con ID ${item.producto_id} no encontrado`
        });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para el producto ${producto.nombre}`
        });
      }

      const precio_unitario = producto.precio;
      const subtotal = precio_unitario * item.cantidad;

      total += subtotal;

      itemsData.push({
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: precio_unitario,
        subtotal: subtotal
      });
    }

    // Crear la orden
    const orden = await OrdenCompra.create({
      cliente_id: id_cliente,
      fecha: new Date(),
      estado: 'pendiente',
      total: total,
      direccion_envio: direccion_envio || null,
      notas: notas || null
    });

    // Crear los items
    const itemsCreados = [];

    for (const itemData of itemsData) {
      const item = await ItemOrdenCompra.create({
        ...itemData,
        orden_compra_id: orden.orden_compra_id
      });

      itemsCreados.push(item);
    }

    // Actualizar stock de productos
    for (const item of items) {
      await Producto.decrement('stock', {
        by: item.cantidad,
        where: {
          producto_id: item.producto_id
        }
      });
    }

    // Obtener la orden completa con sus items
    const ordenCompleta = await OrdenCompra.findByPk(
      orden.orden_compra_id,
      {
        include: [
          {
            model: ItemOrdenCompra,
            include: [Producto]
          }
        ]
      }
    );

    res.status(201).json({
      success: true,
      message: 'Orden creada exitosamente',
      data: ordenCompleta
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la orden',
      error: error.message
    });
  }
};

// Actualizar una orden
export const updateOrden = async (req, res) => {
  try {
    const { id_cliente, id_orden } = req.params;
    const { estado, direccion_envio, notas } = req.body;

    const orden = await OrdenCompra.findOne({
      where: {
        orden_compra_id: id_orden,
        cliente_id: id_cliente
      }
    });

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada'
      });
    }

    // Validar estados permitidos
    const estadosPermitidos = [
      'pendiente',
      'confirmada',
      'enviada',
      'entregada',
      'cancelada'
    ];

    if (estado && !estadosPermitidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado no válido'
      });
    }

    // Actualizar
    await orden.update({
      estado: estado || orden.estado,
      direccion_envio: direccion_envio || orden.direccion_envio,
      notas: notas || orden.notas
    });

    const ordenActualizada = await OrdenCompra.findByPk(
      id_orden,
      {
        include: [
          {
            model: ItemOrdenCompra,
            include: [Producto]
          }
        ]
      }
    );

    res.status(200).json({
      success: true,
      message: 'Orden actualizada exitosamente',
      data: ordenActualizada
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la orden',
      error: error.message
    });
  }
};

// Eliminar una orden
export const deleteOrden = async (req, res) => {
  try {
    const { id_cliente, id_orden } = req.params;

    const orden = await OrdenCompra.findOne({
      where: {
        orden_compra_id: id_orden,
        cliente_id: id_cliente
      }
    });

    if (!orden) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada'
      });
    }

    // Solo se puede eliminar si está pendiente
    if (orden.estado !== 'pendiente') {
      return res.status(400).json({
        success: false,
        message: 'Solo se pueden eliminar órdenes en estado pendiente'
      });
    }

    // Restaurar stock de los productos
    const items = await ItemOrdenCompra.findAll({
      where: {
        orden_compra_id: id_orden
      }
    });

    for (const item of items) {
      await Producto.increment('stock', {
        by: item.cantidad,
        where: {
          producto_id: item.producto_id
        }
      });
    }

    // Eliminar items y orden
    await ItemOrdenCompra.destroy({
      where: {
        orden_compra_id: id_orden
      }
    });

    await orden.destroy();

    res.status(200).json({
      success: true,
      message: 'Orden eliminada exitosamente'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la orden',
      error: error.message
    });
  }
};