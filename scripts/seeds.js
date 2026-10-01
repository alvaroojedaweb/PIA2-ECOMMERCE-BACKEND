import db from "../src/models/index.model.js";
const { sequelize, MODELO, MARCA, PRODUCTO, CLIENTE, EMPLEADO, ROL, CATEGORIA } = db; // ← CAMBIO: agregué CATEGORIA
import { encriptarPassword } from '../src/utils/auth.js';


async function cargarMarcas() {
    const marcas = [
        { nombre: "Samsung" },
        { nombre: "Xiaomi" },
        { nombre: "Apple" },
        { nombre: "Motorola" },
        { nombre: "TecnoSpark" },
    ];

    for (const item of marcas) {
        const [marca] = await MARCA.findOrCreate({
            where: { nombre: item.nombre },
            defaults: item
        });
        console.log(`Marca creada: ${marca.nombre}`);
    }
}

async function cargarModelos() {
    const modelos = [
        { nombre: "A50", marcaId: 1 },
        { nombre: "A52", marcaId: 1 },
        { nombre: "17 Pro Max", marcaId: 3 },
        { nombre: "USB-C a Lightning", marcaId: 3 },
    ];

    for (const item of modelos) {
        const [modelo] = await MODELO.findOrCreate({
            where: { nombre: item.nombre },
            defaults: item
        });
        console.log(`Modelo creado: ${modelo.nombre}`);
    }
}

// ← NUEVO: función para cargar categorías
async function cargarCategorias() {
    const categorias = [
        { nombre: "Celulares" },
        { nombre: "Accesorios" },
    ];

    for (const item of categorias) {
        const [categoria] = await CATEGORIA.findOrCreate({
            where: { nombre: item.nombre },
            defaults: item
        });
        console.log(`Categoría creada: ${categoria.nombre}`);
    }
}

async function cargarProductos() {
    const productos = [
        {
            nombre: "Samsung Galaxy A50",
            modeloId: 1,
            descripcion: "Smartphone Samsung Galaxy A50 con 250Gb de almacenamiento",
            categoriaId: 1,   // ← CAMBIO: era "categoria: 'Celulares'"
            precio: 1499999.00,
            almacenamientoGb: 250,
            stock: 12,
            pesoG: 370,
        },
        {
            nombre: "Iphone 17 Pro Max",
            modeloId: 3,
            descripcion: "Smartphone Iphone 17 Pro Max",
            categoriaId: 1,   // ← CAMBIO
            precio: 1499999.00,
            almacenamientoGb: 250,
            stock: 12,
            pesoG: 370,
        },
        {
            nombre: "Cable Lightning a usb C (2m)",
            modeloId: 4,
            descripcion: "Cable Apple Lightning a usb C de dos metros de largo",
            categoriaId: 2,   // ← CAMBIO
            precio: 1499999.00,
            almacenamientoGb: null,
            stock: 12,
            pesoG: 370,
        }
    ];

    for (const item of productos) {
        const [producto] = await PRODUCTO.findOrCreate({
            where: { nombre: item.nombre },
            defaults: item
        });
        console.log(`Producto creado: ${producto.nombre}`);
    }
}

async function cargarClientes() {
    const clientes = [
        {
            nombre: "Juan",
            apellido: "Pérez",
            email: "juan.perez@ejemplo.com",
            telefono: "1122334455",
            direccion: "Calle Falsa 123",
            password: "123456"   // ← CAMBIO: era "12345" (5 chars). El controlador exige 6.
        },
        {
            nombre: "María",
            apellido: "Gómez",
            email: "maria.gomez@ejemplo.com",
            telefono: "1155443322",
            direccion: "Av. Siempre Viva 742",
            password: "123456"
        },
        {
            nombre: "Carlos",
            apellido: "López",
            email: "carlos.lopez@ejemplo.com",
            telefono: "3415556677",
            direccion: "Bulevar Oroño 456",
            password: "123456"
        }
    ];

    for (const item of clientes) {
        item.password = await encriptarPassword(item.password);

        const [cliente, creado] = await CLIENTE.findOrCreate({
            where: { email: item.email },
            defaults: item
        });

        if (creado) {
            console.log(`Cliente creado: ${cliente.nombre} ${cliente.apellido}`);
        } else {
            console.log(`El cliente con email ${cliente.email} ya existía.`);
        }
    }
}

async function cargarEmpleados() {
    const empleados = [
        {
            nombre: "Juan",
            email: "admin@celulartech.com",
            password: "12asdasAA345",
            rolId: 1
        },
        {
            nombre: "María",
            email: "staff1@celulartech.com",
            password: "12asdasAA345",
            rolId: 2
        }
    ];

    for (const item of empleados) {
        item.password = await encriptarPassword(item.password);

        const [empleado, creado] = await EMPLEADO.findOrCreate({
            where: { email: item.email },
            defaults: item
        });

        if (creado) {
            console.log(`Empleado creado: ${empleado.nombre}`);
        } else {
            console.log(`El empleado con email ${empleado.email} ya existía.`);
        }
    }
}

async function cargarRoles() {
    const roles = [
        { id: 1, nombre: "Admin" },
        { id: 2, nombre: "Staff" }
    ];

    for (const item of roles) {
        const [rol] = await ROL.findOrCreate({
            where: { nombre: item.nombre },
            defaults: item
        });
        console.log(`Rol cargado: ${rol.nombre}`);
    }
}

const runSeed = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        await sequelize.sync({ force: true }); // true solo en desarrollo
        console.log('✅ Base de datos sincronizada');

        await cargarRoles();
        await cargarMarcas();
        await cargarModelos();
        await cargarCategorias();   // ← NUEVO: ANTES de cargarProductos
        await cargarProductos();
        await cargarClientes();
        await cargarEmpleados();

        console.log('Seed completado correctamente.');
    } catch (error) {
        console.error('Error al ejecutar el seed:', error);
    } finally {
        await sequelize.close();
    }
};

runSeed();