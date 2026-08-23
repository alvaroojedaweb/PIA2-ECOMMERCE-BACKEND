// src/controllers/itemOrdenCompra.Controller.js

import ItemOrdenCompra from '../models/itemOrdenCompra.model.js';
import OrdenCompra from '../models/ordenCompra.model.js';
import Producto from '../models/productos.model.js';

// Obtener todos los items de una orden
export const getItemsByOrden = async (req, res) => {
  try {
    const { id_cliente, id_orden } = req.params;

    // Verificar que la orden pertenece al cliente
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

    const items = await ItemOrdenCompra.findAll({
      where: {
        orden_compra_id: id_orden
      },
      include: [Producto]
    });

    res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los items',
      error: error.message
    });
  }
};


// Obtener un item específico
export const getItemById = async (req, res) => {
  try {
    const { id_cliente, id_orden, id_item } = req.params;

    // Verificar que la orden pertenece al cliente
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

    const item = await ItemOrdenCompra.findOne({
      where: {
        id: id_item,
        orden_compra_id: id_orden
      },
      include: [Producto]
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el item',
      error: error.message
    });
  }
};


// Crear un nuevo item
export const createItem = async (req, res) => {
  try {
    const { id_cliente, id_orden } = req.params;
    const { producto_id, cantidad } = req.body;

    // Verificar que la orden pertenece al cliente
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

    // Solo se pueden agregar items a órdenes pendientes
    if (orden.estado !== 'pendiente') {
      return res.status(400).json({
        success: false,
        message: 'Solo se pueden agregar items a órdenes pendientes'
      });
    }

    // Verificar producto
    const producto = await Producto.findByPk(producto_id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Verificar stock
    if (producto.stock < cantidad) {
      return res.status(400).json({
        success: false,
        message: 'Stock insuficiente'
      });
    }

    // Verificar si el producto ya está en la orden
    const itemExistente = await ItemOrdenCompra.findOne({
      where: {
        orden_compra_id: id_orden,
        producto_id: producto_id
      }
    });

    if (itemExistente) {
      return res.status(400).json({
        success: false,
        message: 'El producto ya está en la orden'
      });
    }

    // Crear item
    const precio_unitario = producto.precio;
    const subtotal = precio_unitario * cantidad;

    const item = await ItemOrdenCompra.create({
      orden_compra_id: id_orden,
      producto_id: producto_id,
      cantidad: cantidad,
      precio_unitario: precio_unitario,
      subtotal: subtotal
    });

    // Actualizar total de la orden
    await orden.update({
      total: Number(orden.total) + Number(subtotal)
    });

    // Actualizar stock
    await Producto.decrement('stock', {
      by: cantidad,
      where: {
        producto_id: producto_id
      }
    });

    // Obtener item creado
    const itemCreado = await ItemOrdenCompra.findByPk(item.id, {
      include: [Producto]
    });

    res.status(201).json({
      success: true,
      message: 'Item creado exitosamente',
      data: itemCreado
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el item',
      error: error.message
    });
  }
};


// Actualizar un item
export const updateItem = async (req, res) => {
  try {
    const { id_cliente, id_orden, id_item } = req.params;
    const { cantidad } = req.body;

    // Verificar que la orden pertenece al cliente
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

    // Verificar estado
    if (orden.estado !== 'pendiente') {
      return res.status(400).json({
        success: false,
        message: 'Solo se pueden modificar items de órdenes pendientes'
      });
    }

    // Buscar item
    const item = await ItemOrdenCompra.findOne({
      where: {
        id: id_item,
        orden_compra_id: id_orden
      },
      include: [Producto]
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }

    // Calcular diferencia de cantidad
    const diferenciaCantidad = cantidad - item.cantidad;

    // Si aumenta la cantidad, verificar stock
    if (diferenciaCantidad > 0) {

      const producto = await Producto.findByPk(item.producto_id);

      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      if (producto.stock < diferenciaCantidad) {
        return res.status(400).json({
          success: false,
          message: 'Stock insuficiente'
        });
      }

      await Producto.decrement('stock', {
        by: diferenciaCantidad,
        where: {
          producto_id: item.producto_id
        }
      });

    } else if (diferenciaCantidad < 0) {

      // Si disminuye, devolver stock
      await Producto.increment('stock', {
        by: Math.abs(diferenciaCantidad),
        where: {
          producto_id: item.producto_id
        }
      });
    }

    // Calcular nuevo subtotal
    const nuevoSubtotal =
      Number(item.precio_unitario) * Number(cantidad);

    const diferenciaTotal =
      nuevoSubtotal - Number(item.subtotal);

    // Actualizar item
    await item.update({
      cantidad: cantidad,
      subtotal: nuevoSubtotal
    });

    // Actualizar total
    await orden.update({
      total: Number(orden.total) + diferenciaTotal
    });

    // Obtener item actualizado
    const itemActualizado = await ItemOrdenCompra.findByPk(
      id_item,
      {
        include: [Producto]
      }
    );

    res.status(200).json({
      success: true,
      message: 'Item actualizado exitosamente',
      data: itemActualizado
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el item',
      error: error.message
    });
  }
};


// Eliminar un item
export const deleteItem = async (req, res) => {
  try {
    const { id_cliente, id_orden, id_item } = req.params;

    // Verificar que la orden pertenece al cliente
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

    // Solo se pueden eliminar items pendientes
    if (orden.estado !== 'pendiente') {
      return res.status(400).json({
        success: false,
        message: 'Solo se pueden eliminar items de órdenes pendientes'
      });
    }

    // Buscar item
    const item = await ItemOrdenCompra.findOne({
      where: {
        id: id_item,
        orden_compra_id: id_orden
      }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }

    // Restaurar stock
    await Producto.increment('stock', {
      by: item.cantidad,
      where: {
        producto_id: item.producto_id
      }
    });

    // Actualizar total de la orden
    await orden.update({
      total: Number(orden.total) - Number(item.subtotal)
    });

    // Eliminar item
    await item.destroy();

    res.status(200).json({
      success: true,
      message: 'Item eliminado exitosamente'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el item',
      error: error.message
    });
  }
};