import db from "../models/index.model.js";
const {
  sequelize,
  ORDEN_COMPRA,
  ITEM_ORDEN_COMPRA,
  ITEM_CARRITO,
  PRODUCTO,
  CLIENTE,
} = db;

// ============================================================
// GET /api/ordenes-compra
// Solo admin: lista todas las órdenes
// ============================================================
export const getAll = async (req, res) => {
  try {
    const ordenes = await ORDEN_COMPRA.findAll({
      include: [
        { model: CLIENTE, attributes: ["id", "nombre", "email"] },
        {
          model: ITEM_ORDEN_COMPRA,
          as: "items",
          include: [{ model: PRODUCTO, attributes: ["id", "nombre", "precio"] }],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.json({ estado: true, data: ordenes });
  } catch (error) {
    console.error("Error al listar órdenes:", error);
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// ============================================================
// GET /api/ordenes-compra/mis-ordenes
// Cliente: solo sus propias órdenes
// ============================================================
export const getMisOrdenes = async (req, res) => {
  try {
    const clienteId = req.user.id;
    const ordenes = await ORDEN_COMPRA.findAll({
      where: { clienteId },
      include: [
        {
          model: ITEM_ORDEN_COMPRA,
          as: "items",
          include: [{ model: PRODUCTO, attributes: ["id", "nombre", "precio"] }],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.json({ estado: true, data: ordenes });
  } catch (error) {
    console.error("Error al listar mis órdenes:", error);
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// ============================================================
// GET /api/ordenes-compra/:id
// Cliente dueño de la orden o admin
// ============================================================
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await ORDEN_COMPRA.findByPk(id, {
      include: [
        { model: CLIENTE, attributes: ["id", "nombre", "email"] },
        {
          model: ITEM_ORDEN_COMPRA,
          as: "items",
          include: [{ model: PRODUCTO, attributes: ["id", "nombre", "precio"] }],
        },
      ],
    });

    if (!orden) {
      return res
        .status(404)
        .json({ estado: false, mensaje: "Orden no encontrada" });
    }

    if (req.user.tipo === "cliente" && orden.clienteId !== req.user.id) {
      return res
        .status(403)
        .json({ estado: false, mensaje: "No autorizado" });
    }

    res.json({ estado: true, data: orden });
  } catch (error) {
    console.error("Error al obtener orden:", error);
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// ============================================================
// POST /api/ordenes-compra
// Cliente: crea una orden desde su carrito (transaccional)
// ============================================================
export const create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { direccionEnvio, notas } = req.body;
    const clienteId = req.user.id;

    if (!direccionEnvio) {
      await t.rollback();
      return res.status(400).json({
        estado: false,
        mensaje: "La dirección de envío es obligatoria",
      });
    }
  
    // 1. Leer carrito del cliente
    const itemsCarrito = await ITEM_CARRITO.findAll({
      where: { clienteId },
      include: [{ model: PRODUCTO }],
      transaction: t,
      lock: t.LOCK.UPDATE // 🔒 Protege contra condiciones de carrera bloqueando las filas de stock
    });

    if (itemsCarrito.length === 0) {
      await t.rollback();
      return res.status(400).json({
        estado: false,
        mensaje: "El carrito está vacío",
      });
    }

    // 2. Validar stock y calcular total
    let total = 0;
    const itemsParaOrden = [];

    for (const item of itemsCarrito) {
      const producto = item.PRODUCTO;
      if (!producto) {
        await t.rollback();
        return res.status(400).json({
          estado: false,
          mensaje: `Producto ${item.productoId} ya no existe`,
        });
      }

      if (producto.stock < item.cantidad) {
        await t.rollback();
        return res.status(409).json({
          estado: false,
          mensaje: `Stock insuficiente para "${producto.nombre}". Disponible: ${producto.stock}, solicitado: ${item.cantidad}`,
        });
      }

      const precioUnitario = Number(producto.precio);
      const subtotal = precioUnitario * item.cantidad;
      total += subtotal;

      itemsParaOrden.push({
        productoId: producto.id,
        cantidad: item.cantidad,
        precioUnitario,
        subtotal,
        _productoRef: producto,
      });
    }

    // 3. Crear la orden
    const nuevaOrden = await ORDEN_COMPRA.create(
      {
        clienteId,
        direccionEnvio,
        notas: notas || null,
        total,
        estado: "pendiente",
      },
      { transaction: t }
    );

    // 4. Crear los items de la orden y descontar stock
    for (const item of itemsParaOrden) {
      await ITEM_ORDEN_COMPRA.create(
        {
          ordenCompraId: nuevaOrden.id,
          productoId: item.productoId,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          subtotal: item.subtotal,
        },
        { transaction: t }
      );

      // Descontar stock de forma segura
      await item._productoRef.update(
        { stock: item._productoRef.stock - item.cantidad },
        { transaction: t }
      );
    }

    // 5. Vaciar carrito del cliente
    await ITEM_CARRITO.destroy({
      where: { clienteId },
      transaction: t,
    });

    // Confirmar todos los cambios en la Base de Datos
    await t.commit();

    // 6. Recargar la orden con items para devolverla limpia al cliente
    const ordenCompleta = await ORDEN_COMPRA.findByPk(nuevaOrden.id, {
      include: [
        { model: CLIENTE, attributes: ["id", "nombre", "email"] },
        {
          model: ITEM_ORDEN_COMPRA,
          as: "items",
          include: [{ model: PRODUCTO, attributes: ["id", "nombre", "precio"] }],
        },
      ],
    });

    // Retornar respuesta exitosa (Corregido)
    return res.status(201).json({ estado: true, data: ordenCompleta });

  } catch (error) {
    // Si la transacción sigue abierta por un error inesperado, hacemos rollback
    if (!t.finished) await t.rollback();
    console.error("Error al crear orden:", error);
    return res.status(500).json({ estado: false, mensaje: error.message });
  }
};

// ============================================================
// PUT /api/ordenes-compra/:id
// Admin: actualizar estado de la orden (Corregido: fuera de create)
// ============================================================
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await ORDEN_COMPRA.findByPk(id);

    if (!orden) {
      return res
        .status(404)
        .json({ estado: false, mensaje: "Orden no encontrada" });
    }

    const camposPermitidos = ["estado", "notas", "direccionEnvio"];
    const cambios = {};
    for (const k of camposPermitidos) {
      if (req.body[k] !== undefined) cambios[k] = req.body[k];
    }

    await orden.update(cambios);
    return res.json({ estado: true, data: orden });
  } catch (error) {
    console.error("Error al actualizar orden:", error);
    return res.status(500).json({ estado: false, mensaje: error.message });
  }
};
