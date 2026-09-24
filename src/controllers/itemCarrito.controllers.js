import db from '../models/index.model.js';
const { ITEM_CARRITO, PRODUCTO } = db;

// GET /api/carrito -> Obtener carrito del cliente autenticado
export const obtenerCarritoCliente = async (req, res) => {
  try {
    const clienteId = req.user.id || req.cliente.id;
    const items = await ITEM_CARRITO.findAll({
      where: { clienteId },
      include: [{ model: PRODUCTO }]
    });
    res.status(200).json({ estado: true, data: items });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// GET /api/carrito/:id_item -> Obtener un ítem específico
export const obtenerItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;
    const clienteId = req.user.id || req.cliente.id;

    const item = await ITEM_CARRITO.findOne({
      where: { id: id_item, clienteId }
    });

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Ítem no encontrado en el carrito' });
    }

    res.status(200).json({ estado: true, data: item });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// POST /api/carrito -> Agregar producto o incrementar cantidad
export const agregarAlCarrito = async (req, res) => {
  try {
    const clienteId = req.user.id || req.cliente.id;
    const { productoId, cantidad = 1 } = req.body;

    if (!productoId || cantidad < 1) {
      return res.status(400).json({ estado: false, mensaje: 'Producto no válido o cantidad menor a 1' });
    }

    // Obtener el producto para congelar su precio actual
    const producto = await PRODUCTO.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ estado: false, mensaje: 'Producto no encontrado' });
    }

    // Verificar si ya existe en el carrito del cliente
    let item = await ITEM_CARRITO.findOne({
      where: { clienteId, productoId }
    });

    if (item) {
      item.cantidad += Number(cantidad);
      item.precio = producto.precio;
      await item.save();
    } else {
      item = await ITEM_CARRITO.create({
        clienteId,
        productoId,
        cantidad: Number(cantidad),
        precio: producto.precio
      });
    }

    res.status(201).json({
      estado: true,
      mensaje: 'Producto agregado al carrito',
      data: item
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// PUT /api/carrito/:id_item -> Actualizar cantidad
export const actualizarItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;
    const clienteId = req.user.id || req.cliente.id;
    const { cantidad } = req.body;

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({ estado: false, mensaje: 'La cantidad debe ser mayor o igual a 1' });
    }

    const item = await ITEM_CARRITO.findOne({
      where: { id: id_item, clienteId }
    });

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Ítem no encontrado' });
    }

    item.cantidad = Number(cantidad);
    await item.save();

    res.status(200).json({
      estado: true,
      mensaje: 'Cantidad del ítem actualizada correctamente',
      data: item
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// DELETE /api/carrito/:id_item -> Eliminar del carrito
export const eliminarItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;
    const clienteId = req.user.id || req.cliente.id;

    const item = await ITEM_CARRITO.findOne({
      where: { id: id_item, clienteId }
    });

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Ítem no encontrado' });
    }

    await item.destroy();

    res.status(200).json({
      estado: true,
      mensaje: 'Producto eliminado del carrito correctamente'
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};