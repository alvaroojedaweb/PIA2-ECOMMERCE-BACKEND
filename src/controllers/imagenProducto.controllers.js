import IMAGEN_PRODUCTO from '../models/imagenProducto.model.js';

export const getAllByProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const imagenes = await IMAGEN_PRODUCTO.findAll({ where: { ProductoID: id_producto } });
    res.json({ estado: true, data: imagenes });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id_imagen } = req.params;
    const imagen = await IMAGEN_PRODUCTO.findByPk(id_imagen);
    if (!imagen) return res.status(404).json({ estado: false, mensaje: 'Imagen no encontrada' });
    res.json({ estado: true, data: imagen });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const { ImagenURL, Orden } = req.body;
    const nuevaImagen = await IMAGEN_PRODUCTO.create({
      ProductoID: id_producto,
      ImagenURL,
      Orden
    });
    res.status(201).json({ estado: true, data: nuevaImagen });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id_imagen } = req.params;
    const { ImagenURL, Orden } = req.body;
    const imagen = await IMAGEN_PRODUCTO.findByPk(id_imagen);
    if (!imagen) return res.status(404).json({ estado: false, mensaje: 'Imagen no encontrada' });

    await imagen.update({ ImagenURL, Orden });
    res.json({ estado: true, data: imagen });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { id_imagen } = req.params;
    const imagen = await IMAGEN_PRODUCTO.findByPk(id_imagen);
    if (!imagen) return res.status(404).json({ estado: false, mensaje: 'Imagen no encontrada' });

    await imagen.destroy();
    res.json({ estado: true, mensaje: 'Imagen eliminada permanentemente' });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};