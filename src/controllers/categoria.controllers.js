import db from '../models/index.model.js';
const { CATEGORIA } = db;

export const getAll = async (req, res) => {
  try {
    const data = await CATEGORIA.findAll();
    res.json({ estado: true, data });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al obtener categorías' });
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CATEGORIA.findByPk(id);

    if (!data) {
      return res.status(404).json({ estado: false, mensaje: 'Categoría no encontrada' });
    }

    res.json({ estado: true, data });
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al obtener categoría' });
  }
};

export const create = async (req, res) => {
  try {
    const { nombre } = req.body ?? {};

    if (typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({ estado: false, mensaje: 'El nombre es obligatorio' });
    }

    const data = await CATEGORIA.create({ nombre: nombre.trim() });
    res.status(201).json({ estado: true, data });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ estado: false, mensaje: 'Ya existe una categoría con ese nombre' });
    }
    console.error('Error al crear categoría:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al crear categoría' });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body ?? {};

    const categoria = await CATEGORIA.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ estado: false, mensaje: 'Categoría no encontrada' });
    }

    if (typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({ estado: false, mensaje: 'El nombre es obligatorio' });
    }

    await categoria.update({ nombre: nombre.trim() });
    res.json({ estado: true, data: categoria });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ estado: false, mensaje: 'Ya existe una categoría con ese nombre' });
    }
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al actualizar categoría' });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await CATEGORIA.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ estado: false, mensaje: 'Categoría no encontrada' });
    }

    await categoria.destroy();
    res.json({ estado: true, mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    // Si hay productos usando esta categoría, la FK lo va a impedir
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({
        estado: false,
        mensaje: 'No se puede eliminar: hay productos que usan esta categoría'
      });
    }
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ estado: false, mensaje: 'Error al eliminar categoría' });
  }
};