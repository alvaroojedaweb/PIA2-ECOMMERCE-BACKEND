import db from "../models/index.model.js";
const { ROL } = db

export const getAll = async (req, res) => {
    try {
        const data = await ROL.findAll()
        res.json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al obtener ROLs:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al obtener ROLs',
            error: error.message,
        });
    }
};

export const get = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await ROL.findByPk(id);

        if (!data) {
            
            return res.status(404).json({
                estado: false,
                mensaje: 'ROL no encontrado',
            });
        }

        res.json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al obtener ROL:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al obtener ROL',
            error: error.message,
        });
    }
};

export const create = async (req, res) => {
    try {
        const data = await ROL.create(req.body);

        res.status(201).json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al crear ROL:', error);
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const rol = await ROL.findByPk(id);

        if (!rol) {
            return res.status(404).json({
                estado: false,
                mensaje: 'ROL no encontrado',
            });
        }

        await rol.update(req.body);
        res.json({
            estado: true,
            data: rol,
        });
    } catch (error) {
        console.error('Error al actualizar ROL:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al actualizar ROL',
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
        const rol = await ROL.findByPk(id);

        if (!rol) {
            return res.status(404).json({
                estado: false,
                mensaje: 'ROL no encontrado',
            });
        }

        await rol.destroy();
        res.json({
            estado: true,
            mensaje: 'ROL eliminado correctamente',
        });

    } catch (error) {
        console.error('Error al eliminar ROL:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al eliminar ROL',
            error: error.message,
        });
    }
};