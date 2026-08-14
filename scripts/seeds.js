import db from "../src/models/index.model.js";
const { sequelize, PRODUCTO } = db

// Datos de ejemplo para la tabla productos.
const productosSeed = [
    {
        nombre: "Samsung Galaxy A50",
        marca: "Samsung",
        modelo: "A50",
        descripcion: "Smartphone Samsung Galaxy A50 con 250Gb de almacenamiento",
        categoria: "Celulares",
        precio: 1499999.00,
        almacenamientoGb: 250,
        stock: 12,
        pesoG: 370
    },
    // --- 3 Celulares Adicionales ---
    {
        nombre: "iPhone 15 Pro",
        marca: "Apple",
        modelo: "15 Pro",
        descripcion: "Smartphone Apple iPhone 15 Pro de 128Gb con chip A17 Pro y acabado en titanio",
        categoria: "Celulares",
        precio: 2199999.00,
        almacenamientoGb: 128,
        stock: 8,
        pesoG: 187
    },
    {
        nombre: "Motorola Edge 40 Neo",
        marca: "Motorola",
        modelo: "Edge 40 Neo",
        descripcion: "Smartphone Motorola Edge 40 Neo con 256Gb de almacenamiento y pantalla pOLED curva",
        categoria: "Celulares",
        precio: 899999.00,
        almacenamientoGb: 256,
        stock: 15,
        pesoG: 172
    },
    {
        nombre: "Xiaomi Redmi Note 13 Pro",
        marca: "Xiaomi",
        modelo: "Redmi Note 13 Pro",
        descripcion: "Smartphone Xiaomi Redmi Note 13 Pro con cámara de 200MP y 256Gb de memoria",
        categoria: "Celulares",
        precio: 749999.00,
        almacenamientoGb: 256,
        stock: 20,
        pesoG: 188
    },
    // --- 2 Accesorios ---
    {
        nombre: "Cargador Carga Rápida 25W Type-C",
        marca: "Samsung",
        modelo: "EP-TA800",
        descripcion: "Cargador de pared Super Fast Charging 25W con conector USB Tipo C",
        categoria: "Accesorios",
        precio: 34999.00,
        almacenamientoGb: null,
        stock: 50,
        pesoG: 63
    },
    {
        nombre: "Funda Protectora Transparente MagSafe",
        marca: "Apple",
        modelo: "iPhone 15 Pro Case",
        descripcion: "Funda de silicona transparente con compatibilidad y alineación magnética MagSafe",
        categoria: "Accesorios",
        precio: 49999.00,
        almacenamientoGb: null,
        stock: 35,
        pesoG: 40
    }
];

const runSeed = async () => {
    try {
        // Verificamos que podemos conectarnos a la base de datos.
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        // 5. Insertamos los productos de ejemplo.
        for (const item of productosSeed) {
            const [producto, created] = await PRODUCTO.findOrCreate({
                where: { nombre: item.nombre },
                defaults: item,
            });
            console.log(created ? `Producto creado: ${producto.nombre}` : `Producto ya existe: ${producto.nombre}`);
        }

        console.log('Seed completado correctamente.');
    } catch (error) {
        console.error('Error al ejecutar el seed:', error);
    } finally {
        // Cerramos la conexión para que el script termine.
        await sequelize.close();
    }
};

runSeed()