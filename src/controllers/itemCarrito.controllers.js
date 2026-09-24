import db from '../models/index.model.js';
const { ITEM_CARRITO, PRODUCTO } = db;

// Devuelve la cantidad como entero >= 1, o null si no es válida
const validarCantidad = (v) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 ? n : null;
};

// GET /api/carrito -> Obtener carrito del cliente autenticado
export const obtenerCarritoCliente = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const items = await ITEM_CARRITO.findAll({
      where: { clienteId },
      include: [{ model: PRODUCTO }]
    });
    res.status(200).json({ estado: true, data: items });
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al obtener el carrito' });
  }
};

// GET /api/carrito/:id_item -> Obtener un ítem específico
export const obtenerItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;
    const clienteId = req.user.id;

    const item = await ITEM_CARRITO.findOne({
      where: { id: id_item, clienteId },
      include: [{ model: PRODUCTO }]
    });

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Ítem no encontrado en el carrito' });
    }

    res.status(200).json({ estado: true, data: item });
  } catch (error) {
    console.error('Error al obtener ítem:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al obtener el ítem' });
  }
};

// POST /api/carrito -> Agregar producto o incrementar cantidad
export const agregarAlCarrito = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const { productoId } = req.body ?? {};
    const cantidad = validarCantidad((req.body ?? {}).cantidad ?? 1);

    if (!productoId || cantidad === null) {
      return res.status(400).json({
        estado: false,
        mensaje: 'Producto no válido o cantidad inválida (entero mayor o igual a 1)'
      });
    }

    const producto = await PRODUCTO.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ estado: false, mensaje: 'Producto no encontrado' });
    }

    let item = await ITEM_CARRITO.findOne({ where: { clienteId, productoId } });

    // Lo que tendría el carrito después de agregar, contra el stock real
    const totalDeseado = (item ? item.cantidad : 0) + cantidad;
    if (totalDeseado > producto.stock) {
      return res.status(409).json({
        estado: false,
        mensaje: `Stock insuficiente. Disponible: ${producto.stock}`
      });
    }

    if (item) {
      item.cantidad = totalDeseado;
      item.precio = producto.precio;
      await item.save();
    } else {
      item = await ITEM_CARRITO.create({ clienteId, productoId, cantidad, precio: producto.precio });
    }

    res.status(201).json({ estado: true, mensaje: 'Producto agregado al carrito', data: item });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al agregar al carrito' });
  }
};

// PUT /api/carrito/:id_item -> Actualizar cantidad
export const actualizarItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;
    const clienteId = req.user.id;
    const cantidad = validarCantidad((req.body ?? {}).cantidad);

    if (cantidad === null) {
      return res.status(400).json({
        estado: false,
        mensaje: 'Cantidad inválida (debe ser un número entero mayor o igual a 1)'
      });
    }

    const item = await ITEM_CARRITO.findOne({ where: { id: id_item, clienteId } });
    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Ítem no encontrado en el carrito' });
    }

    const producto = await PRODUCTO.findByPk(item.productoId);
    if (!producto) {
      return res.status(404).json({ estado: false, mensaje: 'Producto no encontrado' });
    }

    if (cantidad > producto.stock) {
      return res.status(409).json({
        estado: false,
        mensaje: `Stock insuficiente. Disponible: ${producto.stock}`
      });
    }

    item.cantidad = cantidad;
    item.precio = producto.precio;
    await item.save();

    res.status(200).json({ estado: true, mensaje: 'Cantidad actualizada correctamente', data: item });
  } catch (error) {
    console.error('Error al actualizar ítem:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al actualizar el ítem' });
  }
};

// DELETE /api/carrito/:id_item -> Eliminar del carrito
export const eliminarItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;
    const clienteId = req.user.id;

    const item = await ITEM_CARRITO.findOne({ where: { id: id_item, clienteId } });
    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Ítem no encontrado en el carrito' });
    }

    await item.destroy();

    res.status(200).json({ estado: true, mensaje: 'Producto eliminado del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al eliminar del carrito' });
  }
};
