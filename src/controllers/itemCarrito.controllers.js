import ITEM_CARRITO from '../models/itemCarrito.model.js';

export const obtenerCarritoCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const items = await ITEM_CARRITO.findAll({
      where: { clienteId: id_cliente }
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const obtenerItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;
    const item = await ITEM_CARRITO.findByPk(id_item);

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Item no encontrado en el carrito' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const agregarAlCarrito = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const { productoId, cantidad, precio } = req.body;

    const nuevoItem = await ITEM_CARRITO.create({
      clienteId: id_cliente,
      productoId,
      cantidad: cantidad || 1,
      precio
    });

    res.status(201).json({
      estado: true,
      mensaje: 'Producto agregado al carrito',
      data: nuevoItem
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// PUT /carrito/:id_item
export const actualizarItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;
    const { cantidad, precio } = req.body;

    const item = await ITEM_CARRITO.findByPk(id_item);

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Item no encontrado' });
    }

    await item.update({ cantidad, precio });

    res.status(200).json({
      estado: true,
      mensaje: 'Item del carrito actualizado correctamente',
      data: item
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const eliminarItemCarrito = async (req, res) => {
  try {
    const { id_item } = req.params;

    const item = await ITEM_CARRITO.findByPk(id_item);

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Item no encontrado' });
    }

    await item.destroy();

    res.status(200).json({
      estado: true,
      mensaje: 'Producto eliminado del carrito permanentemente'
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};