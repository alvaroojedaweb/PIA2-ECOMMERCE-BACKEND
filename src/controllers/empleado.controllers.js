import db from "../models/index.model.js";
const { EMPLEADO, ROL } = db;
import { encriptarPassword } from "../utils/auth.js";

export const getAll = async (req, res) => {
  try {
    const empleados = await EMPLEADO.findAll({
      include: [
        {
          model: ROL,
          as: "ROL",
          attributes: ["nombre"],
        }
      ]
    });
    const dataEmpleados = empleados.map((e) => ({
      id: e.id,
      nombre: e.nombre,
      email: e.email,
      rolId: e.rolId,
      rol: e.ROL?.nombre || null,
    }));
    res.json({ estado: true, data: dataEmpleados });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const empleado = await EMPLEADO.findByPk(id_empleado, {
      include: [
        {
          model: ROL,
          as: "ROL",
          attributes: ["nombre"],
        }
      ]
    });
    if (!empleado)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Empleado no encontrado" });
    const empleadoData = {
      id: empleado.id,
      nombre: empleado.nombre,
      email: empleado.email,
      rolId: empleado.rolId,
      rol: empleado.ROL?.nombre || null,
    };
    res.json({ estado: true, data: empleadoData });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { nombre, email, password, rolId } = req.body;

    let passwordHash = password;
    if (password) {
      passwordHash = await encriptarPassword(password);
    }

    const nuevoEmpleado = await EMPLEADO.create({
      nombre,
      email,
      password: passwordHash, 
      rolId,
    });

    res.status(201).json({ estado: true, data: nuevoEmpleado });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({
        estado: false,
        mensaje:
          "Error de validación: verifique que los datos sean correctos o que el email no esté duplicado",
        error: error.message,
      });
    }
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    
    const { nombre, email, password, rolId } = req.body;
    const empleado = await EMPLEADO.findByPk(id_empleado);
    if (!empleado)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Empleado no encontrado" });

    let passwordHash = empleado.password;
    if (password) {
      passwordHash = await encriptarPassword(password);
    }

    await empleado.update({ nombre, email, password: passwordHash, rolId });
    res.json({ estado: true, data: empleado });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const empleado = await EMPLEADO.findByPk(id_empleado);
    if (!empleado)
      return res
        .status(404)
        .json({ estado: false, mensaje: "Empleado no encontrado" });

    await empleado.destroy();
    res.json({ estado: true, mensaje: "Empleado eliminado permanentemente" });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};
