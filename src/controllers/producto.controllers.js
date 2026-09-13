import db from "../models/index.model.js";
const { PRODUCTO, MARCA, MODELO } = db;


const formatearProducto = (p) => ({
  id: p.id,
  nombre: p.nombre,
  marca: p.MODELO?.MARCA?.nombre || "Sin marca",
  modelo: p.MODELO?.nombre || "Sin modelo",
  descripcion: p.descripcion,
  categoria: p.categoria,
  precio: p.precio,
  almacenamientoGb: p.almacenamientoGb,
  stock: p.stock,
  pesoG: p.pesoG
});

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
    });

    const data = productos.map(formatearProducto);

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

export const getAllWithPagination = async (req, res) => {
  try {
    // 1. Obtener página y límite de la query (con valores por defecto)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 2;
    const offset = (page - 1) * limit;

    // 2. Usar findAndCountAll en lugar de findAll para obtener total y registros
    const { count, rows: productos } = await PRODUCTO.findAndCountAll({
      limit,
      offset,
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

    const data = productos.map(formatearProducto);

    // 3. Responder con metadatos de paginación
    res.json({
      estado: true,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit: limit,
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

    res.json({
      estado: true,
      data: formatearProducto(p),
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
    const { nombre, descripcion, precio, categoria, stock, pesoG, almacenamientoGb, modeloId } = req.body;

    
    if (!nombre || !precio || !modeloId) {
      return res.status(400).json({
        estado: false,
        mensaje: "Campos obligatorios faltantes: 'nombre', 'precio' y 'modeloId' son requeridos.",
      });
    }

    
    const nuevoProducto = await PRODUCTO.create({
      nombre,
      descripcion,
      precio,
      categoria,
      stock: stock !== undefined ? stock : 0,
      pesoG: pesoG !== undefined ? pesoG : 0,
      almacenamientoGb,
      modeloId
    });

    res.status(201).json({
      estado: true,
      data: nuevoProducto,
    });
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    
    
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        estado: false,
        mensaje: "El 'modeloId' proporcionado no existe en la base de datos.",
      });
    }

    res.status(500).json({ estado: false, error: error.message });
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

    await p.update(req.body);

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

    res.json({
      estado: true,
      data: formatearProducto(pActualizado),
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
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const id = req.params.id;
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