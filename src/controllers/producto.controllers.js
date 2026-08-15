import db from "../models/index.model.js";
const { PRODUCTO } = db

export const getAll = async (req, res) => {
  try {
    const data = await PRODUCTO.findAll()
    res.json({
      estado: true,
      data,
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error al obtener productos',
      error: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;

    // findByPk busca un registro por su clave primaria.
    const data = await PRODUCTO.findByPk(id);

    if (!data) {
      // 404 significa "no encontrado".
      return res.status(404).json({
        estado: false,
        mensaje: 'Producto no encontrado',
      });
    }

    res.json({
      estado: true,
      data,
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error al obtener producto',
      error: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    res.json("create");
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    res.json("update");
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message });
  }
};

export const softDelete = async (req, res) => {
  try {
    res.json("softDelete");
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message });
  }
};

export const hardDelete = async (req, res) => {
  try {
    res.json("hardDelete");
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message });
  }
};