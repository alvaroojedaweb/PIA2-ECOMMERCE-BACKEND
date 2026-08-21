import ITEM_CARRITO from '../models/itemCarrito.model.js';

// GET /clientes/:id_cliente/carrito
export const obtenerCarritoCliente = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const items = await ITEM_CARRITO.findAll({
      where: { ClienteID: id_cliente }
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// GET /clientes/:id_cliente/carrito/:id_item
export const obtenerItemCarrito = async (req, res) => {
  try {
    const { id_cliente, id_item } = req.params;
    const item = await ITEM_CARRITO.findOne({
      where: { ID: id_item, ClienteID: id_cliente }
    });

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Item no encontrado en el carrito' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// POST /clientes/:id_cliente/carrito
export const agregarAlCarrito = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const { ProductoID, Cantidad, Precio } = req.body;

    const nuevoItem = await ITEM_CARRITO.create({
      ClienteID: id_cliente,
      ProductoID,
      Cantidad: Cantidad || 1,
      Precio
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

// PUT /clientes/:id_cliente/carrito/:id_item
export const actualizarItemCarrito = async (req, res) => {
  try {
    const { id_cliente, id_item } = req.params;
    const { Cantidad, Precio } = req.body;

    const item = await ITEM_CARRITO.findOne({
      where: { ID: id_item, ClienteID: id_cliente }
    });

    if (!item) {
      return res.status(404).json({ estado: false, mensaje: 'Item no encontrado' });
    }

    await item.update({ Cantidad, Precio });

    res.status(200).json({
      estado: true,
      mensaje: 'Item del carrito actualizado correctamente',
      data: item
    });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// DELETE /clientes/:id_cliente/carrito/:id_item/hard
export const eliminarItemCarrito = async (req, res) => {
  try {
    const { id_cliente, id_item } = req.params;

    const item = await ITEM_CARRITO.findOne({
      where: { ID: id_item, ClienteID: id_cliente }
    });

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