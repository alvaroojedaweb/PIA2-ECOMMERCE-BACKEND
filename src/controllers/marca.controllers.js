import db from "../models/index.model.js";
const { MARCA } = db

export const getAll = async (req, res) => {
    try {
        const data = await MARCA.findAll()
        res.json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al obtener MARCAs:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al obtener MARCAs',
            error: error.message,
        });
    }
};

export const get = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await MARCA.findByPk(id);

        if (!data) {
            
            return res.status(404).json({
                estado: false,
                mensaje: 'MARCA no encontrado',
            });
        }

        res.json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al obtener MARCA:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al obtener MARCA',
            error: error.message,
        });
    }
};

export const create = async (req, res) => {
    try {
        const data = await MARCA.create(req.body);

        res.status(201).json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al crear MARCA:', error);
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const marca = await MARCA.findByPk(id);

        if (!marca) {
            return res.status(404).json({
                estado: false,
                mensaje: 'Marca no encontrado',
            });
        }

        await marca.update(req.body);
        res.json({
            estado: true,
            data: marca,
        });
    } catch (error) {
        console.error('Error al actualizar MARCA:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al actualizar MARCA',
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
        const marca = await MARCA.findByPk(id);

        if (!marca) {
            return res.status(404).json({
                estado: false,
                mensaje: 'Marca no encontrada',
            });
        }

        await marca.destroy();
        res.json({
            estado: true,
            mensaje: 'Marca eliminada correctamente',
        });

    } catch (error) {
        console.error('Error al eliminar marca:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al eliminar marca',
            error: error.message,
        });
    }
};