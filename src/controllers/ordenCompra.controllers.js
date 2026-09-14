import db from '../models/index.model.js';
const { ORDEN_COMPRA } = db;

export const getAll = async (req, res) => {
    try {
        const ordenes = await ORDEN_COMPRA.findAll();
    res.json({ estado: true, data: ordenes });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await ORDEN_COMPRA.findByPk(id);
    if (!orden) return res.status(404).json({ estado: false, mensaje: 'orden no encontrada' });
    
    res.json({ estado: true, data: orden });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { clienteId, empleadoId, direccionEnvio, notas, total } = req.body;
    const nuevaOrden = await ORDEN_COMPRA.create({
      clienteId,
      empleadoId,
      direccionEnvio,
      notas,
      total,
      estado: 'pendiente'
    });
    
    res.status(201).json({ estado: true, data: nuevaOrden });
  } catch (error) {
    res.status(400).json({ estado: false, mensaje: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await ORDEN_COMPRA.findByPk(id);
    if (!orden) return res.status(404).json({ estado: false, mensaje: 'Orden no encontrada' });

    await orden.update(req.body);
    res.json({ estado: true, data: orden });
  } catch (error) {
    res.status(400).json({ estado: false, mensaje: error.message });
  }
};
    
