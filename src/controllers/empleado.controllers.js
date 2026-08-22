import EMPLEADO from '../models/empleados.model.js';

export const getAll = async (req, res) => {
  try {
    const empleados = await EMPLEADO.findAll();
    res.json({ estado: true, data: empleados });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const empleado = await EMPLEADO.findByPk(id_empleado);
    if (!empleado) return res.status(404).json({ estado: false, mensaje: 'Empleado no encontrado' });
    res.json({ estado: true, data: empleado });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { Nombre, Email, Contraseña, Rol } = req.body;
    const nuevoEmpleado = await EMPLEADO.create({ Nombre, Email, Contraseña, Rol });
    res.status(201).json({ estado: true, data: nuevoEmpleado });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const { Nombre, Email, Contraseña, Rol } = req.body;
    const empleado = await EMPLEADO.findByPk(id_empleado);
    if (!empleado) return res.status(404).json({ estado: false, mensaje: 'Empleado no encontrado' });

    await empleado.update({ Nombre, Email, Contraseña, Rol });
    res.json({ estado: true, data: empleado });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { id_empleado } = req.params;
    const empleado = await EMPLEADO.findByPk(id_empleado);
    if (!empleado) return res.status(404).json({ estado: false, mensaje: 'Empleado no encontrado' });

    await empleado.destroy();
    res.json({ estado: true, mensaje: 'Empleado eliminado permanentemente' });
  } catch (error) {
    res.status(500).json({ estado: false, mensaje: error.message });
  }
};