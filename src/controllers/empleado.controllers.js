import db from "../models/index.model.js";
const { EMPLEADO } = db;

export const getAll = async (req, res) => {
  try {
    const data = await EMPLEADO.findAll();
    res.json({
      estado: true,
      data,
    });
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error al obtener empleados',
      error: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id_empleado;
    const data = await EMPLEADO.findByPk(id);

    if (!data) {
      return res.status(404).json({
        estado: false,
        mensaje: 'Empleado no encontrado',
      });
    }

    res.json({
      estado: true,
      data,
    });
  } catch (error) {
    console.error('Error al obtener empleado:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error al obtener empleado',
      error: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const data = await EMPLEADO.create(req.body);
    res.status(201).json({
      estado: true,
      mensaje: 'Empleado creado exitosamente',
      data,
    });
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error al crear empleado',
      error: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id_empleado;
    const [filasAfectadas] = await EMPLEADO.update(req.body, {
      where: { id }
    });

    if (filasAfectadas === 0) {
      return res.status(404).json({
        estado: false,
        mensaje: 'Empleado no encontrado para actualizar',
      });
    }

    res.json({
      estado: true,
      mensaje: 'Empleado actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error al actualizar empleado',
      error: error.message,
    });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const id = req.params.id_empleado;
    const filasBorradas = await EMPLEADO.destroy({
      where: { id }
    });

    if (filasBorradas === 0) {
      return res.status(404).json({
        estado: false,
        mensaje: 'Empleado no encontrado para eliminar',
      });
    }

    res.json({
      estado: true,
      mensaje: 'Empleado eliminado permanentemente',
    });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({
      estado: false,
      mensaje: 'Error al eliminar empleado',
      error: error.message,
    });
  }
};