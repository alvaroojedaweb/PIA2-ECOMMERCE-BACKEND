import db from "../src/models/index.model.js";
const { sequelize, MODELO, MARCA, PRODUCTO } = db

// Datos de ejemplo para la tabla productos.
const productosSeed = [

];



async function cargarMarcas() {
    const marcas = [
        {
            nombre: "Samsung",
        },
        {
            nombre: "Xiaomi",
        },
        {
            nombre: "Apple",
        },
        {
            nombre: "Motorola",
        },
        {
            nombre: "TecnoSpark",
        },
    ];

    for (const item of marcas) {
        const [marca] = await MARCA.findOrCreate({
            where: {
                nombre: item.nombre
            },
            defaults: item
        });
        console.log(`Marca creada: ${marca.nombre}`);

    }
}

async function cargarModelos() {
    const modelos = [
        {
            nombre: "A50",
            marcaId: "1"
        },
        {
            nombre: "A52",
            marcaId: "1"
        },
        {
            nombre: "17 Pro Max",
            marcaId: "3"
        },
        {
            nombre: "USB-C a Lightning",
            marcaId: "3"
        },
    ];

    for (const item of modelos) {
        const [modelo] = await MODELO.findOrCreate({
            where: {
                nombre: item.nombre
            },
            defaults: item
        });
        console.log(`Modelo creado: ${modelo.nombre}`);

    }
}

async function cargarProductos() {
    const productos = [
        {
            nombre: "Samsung Galaxy A50",
            modeloId: 1,
            descripcion: "Smartphone Samsung Galaxy A50 con 250Gb de almacenamiento",
            categoria: "Celulares",
            precio: 1499999.00,
            almacenamientoGb: 250,
            stock: 12,
            pesoG: 370,
        },
        {
            nombre: "Iphone 17 Pro Max",
            modeloId: 3,
            descripcion: "Smartphone Iphone 17 Pro Max ",
            categoria: "Celulares",
            precio: 1499999.00,
            almacenamientoGb: 250,
            stock: 12,
            pesoG: 370,
        }
        ,
        {
            nombre: "Cable Lightning a usb C (2m)",
            modeloId: 4,
            descripcion: "Cable Apple Lightning a usb C de dos metros de largo",
            categoria: "Accesorios",
            precio: 1499999.00,
            almacenamientoGb: null,
            stock: 12,
            pesoG: 370,
        }
    ];


    for (const item of productos) {
        const [producto] = await PRODUCTO.findOrCreate({
            where: {
                nombre: item.nombre
            },
            defaults: item
        });
        console.log(`Producto creado: ${producto.nombre}`);

    }
}

const runSeed = async () => {
    try {
        // Verificamos que podemos conectarnos a la base de datos.
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        await sequelize.sync({ force: true }); //true solo en desarrollo
        console.log('✅ Base de datos sincronizada');

        await cargarMarcas()
        await cargarModelos()
        await cargarProductos()

        console.log('Seed completado correctamente.');
    } catch (error) {
        console.error('Error al ejecutar el seed:', error);
    } finally {
        // Cerramos la conexión para que el script termine.
        await sequelize.close();
    }
};

runSeed()