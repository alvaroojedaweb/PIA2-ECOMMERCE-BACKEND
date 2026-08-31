import db from '../models/index.model.js';
const { CLIENTE } = db;
import { encriptarPassword } from '../utils/auth.js';


export const obtener = async (req, res) => {
    try {
        const data = await CLIENTE.findAll();
        res.json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al obtener clientes',
            error: error.message,
        });
    }
};

export const obtenerPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const data = await CLIENTE.findByPk(id);

        if (!data) {
            return res.status(404).json({
                estado: false,
                mensaje: 'Cliente no encontrado',
            });
        }

        res.json({
            estado: true,
            data,
        });
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al obtener cliente',
            error: error.message,
        });
    }
};

export const crear = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, direccion, password } = req.body;

        if (!password) {
            return res.status(400).json({
                estado: false,
                mensaje: 'La contraseña es obligatoria'
            });
        }

        const passwordHash = await encriptarPassword(password);

        const nuevoCliente = await CLIENTE.create({
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            password: passwordHash
        });

        const clienteResponse = nuevoCliente.toJSON();
        delete clienteResponse.password;

        res.status(201).json({ 
            estado: true, 
            data: clienteResponse 
        });
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                estado: false,
                mensaje: 'Error de validación: verifique que los datos sean correctos o que el email no esté duplicado',
                error: error.message
            });
        }
        res.status(500).json({ 
            estado: false, 
            mensaje: 'Error al crear cliente', 
            error: error.message 
        });
    }
};

export const actualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nombre, apellido, email, telefono, direccion, password } = req.body;
        const cliente = await CLIENTE.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ 
                estado: false, 
                mensaje: 'Cliente no encontrado' 
            });
        }

        let passwordHash = cliente.password;
        if (password) {
            passwordHash = await encriptarPassword(password);
        }

        await cliente.update({
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            password: passwordHash
        });

        const clienteResponse = cliente.toJSON();
        delete clienteResponse.password;

        res.json({ 
            estado: true, 
            data: clienteResponse 
        });
    } catch (error) {
        res.status(500).json({ 
            estado: false, 
            mensaje: 'Error al actualizar cliente', 
            error: error.message 
        });
    }
};

export const eliminar = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const cliente = await CLIENTE.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                estado: false,
                mensaje: 'Cliente no encontrado',
            });
        }

        await cliente.destroy();
        res.json({
            estado: true,
            mensaje: 'Cliente eliminado correctamente',
        });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al eliminar cliente',
            error: error.message,
        });
    }
};