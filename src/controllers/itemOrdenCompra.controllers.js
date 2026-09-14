import db from '../models/index.model.js';
const { ITEM_ORDEN_COMPRA } = db;

export const getAll = async (req, res) => {
  try {
    const items = await ITEM_ORDEN_COMPRA.findAll();
    res.json({ estado: true, data: items });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { ordenCompraId, productoId, cantidad, precioUnitario, subtotal } = req.body;
    const nuevoItem = await ITEM_ORDEN_COMPRA.create({
      ordenCompraId,
      productoId,
      cantidad,
      precioUnitario,
      subtotal
    });
    
    res.status(201).json({ estado: true, data: nuevoItem });
  } catch (error) {
    res.status(400).json({ estado: false, mensaje: error.message });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ITEM_ORDEN_COMPRA.findByPk(id);
    if (!item) return res.status(404).json({ estado: false, mensaje: 'Ítem no encontrado' });

    await item.destroy();
    res.json({ estado: true, mensaje: 'Ítem eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};