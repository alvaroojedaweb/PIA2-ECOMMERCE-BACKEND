import { unlink } from 'node:fs/promises';
import path from 'node:path';
import db from '../models/index.model.js';
import { uploadsDir } from '../middleware/upload.js';

const { IMAGEN_PRODUCTO, PRODUCTO } = db;

const eliminarArchivoSubido = async (imagenUrl) => {
  const prefijoUploads = '/uploads/';
  if (!imagenUrl?.startsWith(prefijoUploads)) return;

  const nombreArchivo = imagenUrl.slice(prefijoUploads.length);
  if (
    !nombreArchivo ||
    nombreArchivo === '.' ||
    nombreArchivo === '..' ||
    nombreArchivo.includes('/') ||
    nombreArchivo.includes('\\')
  ) {
    return;
  }

  try {
    await unlink(path.join(uploadsDir, nombreArchivo));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error al eliminar archivo de imagen:', error);
    }
  }
};

export const getAllByProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const imagenes = await IMAGEN_PRODUCTO.findAll({ where: { productoId: id_producto } });
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
  const archivoNuevo = req.file;
  let archivoPersistido = false;
  try {
    const { id_producto } = req.params;
    const { imagenUrl, orden } = req.body;
    const producto = await PRODUCTO.findByPk(id_producto);

    if (!producto) {
      if (archivoNuevo) {
        await eliminarArchivoSubido(`/uploads/${archivoNuevo.filename}`);
      }
      return res.status(404).json({ estado: false, mensaje: 'Producto no encontrado' });
    }

    const urlImagen = archivoNuevo
      ? `/uploads/${archivoNuevo.filename}`
      : imagenUrl;

    if (!urlImagen) {
      return res.status(400).json({
        estado: false,
        mensaje: 'Debe enviar el archivo "imagen" o el campo "imagenUrl"',
      });
    }

    let ordenImagen = orden;
    if (archivoNuevo && ordenImagen === undefined) {
      const ultimaImagen = await IMAGEN_PRODUCTO.findOne({
        where: { productoId: id_producto },
        order: [['orden', 'DESC']],
      });
      ordenImagen = (ultimaImagen?.orden ?? 0) + 1;
    }

    const nuevaImagen = await IMAGEN_PRODUCTO.create({
      productoId: id_producto,
      imagenUrl: urlImagen,
      orden: ordenImagen
    });
    archivoPersistido = true;
    res.status(201).json({ estado: true, data: nuevaImagen });
  } catch (error) {
    if (archivoNuevo && !archivoPersistido) {
      await eliminarArchivoSubido(`/uploads/${archivoNuevo.filename}`);
    }
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const update = async (req, res) => {
  let archivoNuevo;
  let archivoPersistido = false;
  try {
    const { id_imagen } = req.params;
    const { imagenUrl, orden } = req.body;
    archivoNuevo = req.file;

    const imagen = await IMAGEN_PRODUCTO.findByPk(id_imagen);
    if (!imagen) {
      if (archivoNuevo) {
        await eliminarArchivoSubido(`/uploads/${archivoNuevo.filename}`);
      }
      return res.status(404).json({ estado: false, mensaje: 'Imagen no encontrada' });
    }

    const imagenAnterior = imagen.imagenUrl;
    const cambios = {};
    if (archivoNuevo) {
      cambios.imagenUrl = `/uploads/${archivoNuevo.filename}`;
    } else if (imagenUrl !== undefined) {
      cambios.imagenUrl = imagenUrl;
    }
    if (orden !== undefined) cambios.orden = orden;

    await imagen.update(cambios);
    archivoPersistido = true;

    if (archivoNuevo && imagenAnterior !== cambios.imagenUrl) {
      await eliminarArchivoSubido(imagenAnterior);
    }

    res.json({ estado: true, data: imagen });
  } catch (error) {
    if (archivoNuevo && !archivoPersistido) {
      await eliminarArchivoSubido(`/uploads/${archivoNuevo.filename}`);
    }
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