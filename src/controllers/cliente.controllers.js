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
        const { nombre, apellido, email, telefono, direccion, password } = req.body ?? {};

        // Validaciones de entrada, antes de tocar la base de datos
        if (typeof nombre !== 'string' || !nombre.trim()) {
            return res.status(400).json({ estado: false, mensaje: 'El nombre es obligatorio' });
        }

        const emailValido = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        if (!emailValido) {
            return res.status(400).json({ estado: false, mensaje: 'El email no tiene un formato válido' });
        }

        if (typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({
                estado: false,
                mensaje: 'La contraseña es obligatoria y debe tener al menos 6 caracteres'
            });
        }

        const passwordHash = await encriptarPassword(password);

        const nuevoCliente = await CLIENTE.create({
            nombre: nombre.trim(),
            apellido,
            email: email.trim(),
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
        console.error('Error al crear cliente:', error);
        res.status(500).json({
            estado: false,
            mensaje: 'Error al crear cliente'
        });
    }
};

export const actualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { password } = req.body;
        const cliente = await CLIENTE.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                estado: false,
                mensaje: 'Cliente no encontrado'
            });
        }

        // Solo se actualizan los campos que llegaron en el body
        const campos = {};
        for (const k of ['nombre', 'apellido', 'email', 'telefono', 'direccion']) {
            if (req.body[k] !== undefined) campos[k] = req.body[k];
        }
        if (password) campos.password = await encriptarPassword(password);

        await cliente.update(campos);

        const clienteResponse = cliente.toJSON();
        delete clienteResponse.password;

        res.json({ estado: true, data: clienteResponse });
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

