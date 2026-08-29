import db from "../models/index.model.js";
const { PRODUCTO, MARCA, MODELO } = db

export const getAll = async (req, res) => {
  try {
    const productos = await PRODUCTO.findAll({
      include: [
        {
          model: MODELO,
          as: "MODELO",
          include: [
            {
              model: MARCA,
              as: "MARCA"
            }
          ]
        }
      ]
    })

    const data = productos.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      marca: p.MODELO.MARCA.nombre,
      modelo: p.MODELO.nombre,
      descripcion: p.descripcion,
      categoria: p.categoria,
      precio: p.precio,
      almacenamientoGb: p.almacenamientoGb,
      stock: p.stock,
      pesoG: p.pesoG
    }))

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
    const p = await PRODUCTO.findByPk(id, {
      include: [
        {
          model: MODELO,
          as: "MODELO",
          include: [
            {
              model: MARCA,
              as: "MARCA"
            }
          ]
        }
      ]
    });

    if (!p) {
      
      return res.status(404).json({
        estado: false,
        mensaje: 'Producto no encontrado',
      });
    }

    const data = {
      id: p.id,
      nombre: p.nombre,
      marca: p.MODELO.MARCA.nombre,
      modelo: p.MODELO.nombre,
      descripcion: p.descripcion,
      categoria: p.categoria,
      precio: p.precio,
      almacenamientoGb: p.almacenamientoGb,
      stock: p.stock,
      pesoG: p.pesoG
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
    const { id } = req.params
    const data = await PRODUCTO.create(req.body)
    res.status(201).json({
      estado: true,
      data,
    });
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message });
  }


};

export const update = async (req, res) => {
  try {
    const id = req.params.id;

    const p = await PRODUCTO.findByPk(id);

    if (!p) {
      
      return res.status(404).json({
        estado: false,
        mensaje: 'Producto no encontrado',
      });
    }

    await p.update(req.body)

    const pActualizado = await PRODUCTO.findByPk(id, {
      include: [
        {
          model: MODELO,
          as: "MODELO",
          include: [
            {
              model: MARCA,
              as: "MARCA"
            }
          ]
        }
      ]
    });

    const data = {
      id: pActualizado.id,
      nombre: pActualizado.nombre,
      marca: pActualizado.MODELO.MARCA.nombre,
      modelo: pActualizado.MODELO.nombre,
      descripcion: pActualizado.descripcion,
      categoria: pActualizado.categoria,
      precio: pActualizado.precio,
      almacenamientoGb: pActualizado.almacenamientoGb,
      stock: pActualizado.stock,
      pesoG: pActualizado.pesoG
    }

    res.json({
      estado: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      estado: false,
      mensaje: 'Error al actualizar producto',
      error: error.message,
    });
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
    const id = req.params.id
    const p = await PRODUCTO.findByPk(id);

    if (!p) {
      return res.status(404).json({
        estado: false,
        mensaje: 'Producto no encontrado',
      });
    }

    await p.destroy();
    res.json({
      estado: true,
      mensaje: 'Producto eliminado correctamente',
    });

  } catch (error) {
    res.status(500).json({
      estado: false,
      mensaje: 'Error al eliminar producto',
      error: error.message,
    });
  }
};