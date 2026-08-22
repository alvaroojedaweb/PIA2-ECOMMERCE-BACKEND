import db from "../models/index.model.js";
const { MODELO } = db

export const getAll = async (req, res) => {
    try {
        const { id_marca } = req.params;
        const data = await MODELO.findAll(
            { where: { marcaId: id_marca } }
        )
        res.json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al obtener MODELOs:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al obtener MODELOs',
            error: error.message,
        });
    }
};

export const get = async (req, res) => {
    try {
        const { id_marca, id_modelo } = req.params;

        const data = await MODELO.findByPk(id_modelo,
            { where: { marcaId: id_marca } }
        );

        if (!data) {
            // 404 significa "no encontrado".
            return res.status(404).json({
                estado: false,
                mensaje: 'MODELO no encontrado',
            });
        }

        res.json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al obtener MODELO:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al obtener MODELO',
            error: error.message,
        });
    }
};

export const create = async (req, res) => {
    try {
        const { id_marca } = req.params
        const { nombre } = req.body
        const data = await MODELO.create({
            nombre,
            marcaId: id_marca
        });

        res.status(201).json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al crear MODELO:', error);
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const modelo = await MODELO.findByPk(id);

        if (!modelo) {
            return res.status(404).json({
                estado: false,
                mensaje: 'MODELO no encontrado',
            });
        }

        await modelo.update(req.body);
        res.json({
            estado: true,
            data: modelo,
        });
    } catch (error) {
        console.error('Error al actualizar MODELO:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al actualizar MODELO',
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
        const modelo = await MODELO.findByPk(id);

        if (!modelo) {
            return res.status(404).json({
                estado: false,
                mensaje: 'MODELO no encontrada',
            });
        }

        await modelo.destroy();
        res.json({
            estado: true,
            mensaje: 'MODELO eliminada correctamente',
        });

    } catch (error) {
        console.error('Error al eliminar MODELO:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al eliminar MODELO',
            error: error.message,
        });
    }
};