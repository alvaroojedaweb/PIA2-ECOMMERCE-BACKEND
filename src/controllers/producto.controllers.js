import db from "../models/index.model.js";
import { Op } from "sequelize";
const { PRODUCTO, MARCA, MODELO, CATEGORIA, IMAGEN_PRODUCTO } = db;

// Formatea un producto para devolver al frontend.
// Incluye marca, modelo, categoría e imágenes.
const formatearProducto = (p) => ({
  id: p.id,
  nombre: p.nombre,
  descripcion: p.descripcion,
  precio: p.precio,
  stock: p.stock,
  pesoG: p.pesoG,
  almacenamientoGb: p.almacenamientoGb,
  // Modelo y marca
  modeloId: p.MODELO?.id ?? null,
  modelo: p.MODELO?.nombre ?? null,
  marcaId: p.MODELO?.MARCA?.id ?? null,
  marca: p.MODELO?.MARCA?.nombre ?? "Sin marca",
  // Categoría
  categoriaId: p.CATEGORIA?.id ?? null,
  categoria: p.CATEGORIA?.nombre ?? null,
  // Imágenes (el alias en el modelo es "imagenes")
  imagenes: (p.imagenes || []).map((img) => ({
    id: img.id,
    url: img.imagenUrl,
    orden: img.orden,
  })),
});

// Include que se reutiliza en todas las consultas de productos
const includeCompleto = [
  {
    model: MODELO,
    as: "MODELO",
    include: [{ model: MARCA, as: "MARCA" }],
  },
  { model: CATEGORIA, as: "CATEGORIA" },
  { model: IMAGEN_PRODUCTO, as: "imagenes" },
];

// GET /api/productos
// Acepta: ?page=, ?limit=, ?categoriaId=, ?marcaId=, ?q=
export const getAll = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const offset = (page - 1) * limit;

    const { categoriaId, marcaId, q } = req.query;

    const where = {};
    if (categoriaId) where.categoriaId = categoriaId;
    if (q) where.nombre = { [Op.like]: `%${q}%` };

    // Filtro por marca: se aplica en el include de MODELO
    const includeModelo = {
      model: MODELO,
      as: "MODELO",
      include: [{ model: MARCA, as: "MARCA" }],
    };
    if (marcaId) includeModelo.where = { marcaId };

    const { count, rows } = await PRODUCTO.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "ASC"]],
      include: [
        includeModelo,
        { model: CATEGORIA, as: "CATEGORIA" },
        { model: IMAGEN_PRODUCTO, as: "imagenes" },
      ],
      distinct: true,
    });

    res.json({
      estado: true,
      totalItems: count,
      totalPages: Math.ceil(count / limit) || 1,
      currentPage: page,
      limit,
      data: rows.map(formatearProducto),
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      estado: false,
      mensaje: "Error al obtener productos",
      error: error.message,
    });
  }
};

// Alias para no romper compatibilidad con rutas viejas
export const getAllWithPagination = getAll;

// GET /api/productos/:id
export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const p = await PRODUCTO.findByPk(id, { include: includeCompleto });

    if (!p) {
      return res.status(404).json({
        estado: false,
        mensaje: "Producto no encontrado",
      });
    }

    res.json({ estado: true, data: formatearProducto(p) });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({
      estado: false,
      mensaje: "Error al obtener producto",
      error: error.message,
    });
  }
};

// POST /api/productos
export const create = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      categoriaId,
      stock,
      pesoG,
      almacenamientoGb,
      modeloId,
    } = req.body;

    // Validaciones básicas
    if (!nombre || !descripcion || !precio || !categoriaId || !modeloId) {
      return res.status(400).json({
        estado: false,
        mensaje:
          "Campos obligatorios: nombre, descripcion, precio, categoriaId y modeloId",
      });
    }

    if (typeof precio !== "number" || precio < 0) {
      return res.status(400).json({
        estado: false,
        mensaje: "El precio debe ser un número mayor o igual a 0",
      });
    }

    const nuevoProducto = await PRODUCTO.create({
      nombre,
      descripcion,
      precio,
      categoriaId,
      stock: stock ?? 0,
      pesoG: pesoG ?? 0,
      almacenamientoGb: almacenamientoGb ?? null,
      modeloId,
    });

    // Recargamos con includes para devolver todo formateado
    const pCompleto = await PRODUCTO.findByPk(nuevoProducto.id, {
      include: includeCompleto,
    });

    res.status(201).json({
      estado: true,
      data: formatearProducto(pCompleto),
    });
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        estado: false,
        mensaje: "categoriaId o modeloId no existen en la base de datos",
      });
    }
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        estado: false,
        mensaje: "Datos inválidos",
        error: error.message,
      });
    }
    res.status(500).json({ estado: false, error: error.message });
  }
};

// PUT /api/productos/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const p = await PRODUCTO.findByPk(id);

    if (!p) {
      return res.status(404).json({
        estado: false,
        mensaje: "Producto no encontrado",
      });
    }

    // Whitelist: solo estos campos se pueden actualizar
    const camposPermitidos = [
      "nombre",
      "descripcion",
      "precio",
      "categoriaId",
      "stock",
      "pesoG",
      "almacenamientoGb",
      "modeloId",
    ];
    const cambios = {};
    for (const k of camposPermitidos) {
      if (req.body[k] !== undefined) cambios[k] = req.body[k];
    }

    await p.update(cambios);

    const pActualizado = await PRODUCTO.findByPk(id, {
      include: includeCompleto,
    });

    res.json({
      estado: true,
      data: formatearProducto(pActualizado),
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      estado: false,
      mensaje: "Error al actualizar producto",
      error: error.message,
    });
  }
};

// DELETE /api/productos/:id/hard
export const hardDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const p = await PRODUCTO.findByPk(id);

    if (!p) {
      return res.status(404).json({
        estado: false,
        mensaje: "Producto no encontrado",
      });
    }

    await p.destroy();
    res.json({
      estado: true,
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      estado: false,
      mensaje: "Error al eliminar producto",
      error: error.message,
    });
  }
};

// Stub por ahora (soft delete real queda para Etapa 5)
export const softDelete = async (req, res) => {
  res.status(501).json({
    estado: false,
    mensaje: "Soft delete aún no implementado",
  });
};