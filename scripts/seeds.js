import db from "../src/models/index.model.js";
const {
  sequelize,
  MODELO,
  MARCA,
  PRODUCTO,
  CLIENTE,
  EMPLEADO,
  ROL,
  CATEGORIA,
  IMAGEN_PRODUCTO,
} = db;
import { encriptarPassword } from "../src/utils/auth.js";

// ============================================================
// ROLES
// ============================================================
async function cargarRoles() {
  const roles = [
    { id: 1, nombre: "Admin" },
    { id: 2, nombre: "Staff" },
  ];
  for (const item of roles) {
    const [rol] = await ROL.findOrCreate({
      where: { nombre: item.nombre },
      defaults: item,
    });
    console.log(`Rol cargado: ${rol.nombre}`);
  }
}

// ============================================================
// MARCAS
// ============================================================
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
      defaults: item,
    });
    console.log(`Marca creada: ${marca.nombre}`);
  }
}

// ============================================================
// MODELOS
// ============================================================
async function cargarModelos() {
  const modelos = [
    { nombre: "A50", marcaId: 1 },              // Samsung
    { nombre: "A52", marcaId: 1 },              // Samsung
    { nombre: "Redmi Note 13", marcaId: 2 },    // Xiaomi
    { nombre: "17 Pro Max", marcaId: 3 },       // Apple
    { nombre: "USB-C a Lightning", marcaId: 3 }, // Apple
    { nombre: "Moto G84", marcaId: 4 },         // Motorola
  ];
  for (const item of modelos) {
    const [modelo] = await MODELO.findOrCreate({
      where: { nombre: item.nombre },
      defaults: item,
    });
    console.log(`Modelo creado: ${modelo.nombre}`);
  }
}

// ============================================================
// CATEGORÍAS
// ============================================================
async function cargarCategorias() {
  const categorias = [
    { nombre: "Celulares" },
    { nombre: "Accesorios" },
  ];
  for (const item of categorias) {
    const [categoria] = await CATEGORIA.findOrCreate({
      where: { nombre: item.nombre },
      defaults: item,
    });
    console.log(`Categoría creada: ${categoria.nombre}`);
  }
}

// ============================================================
// PRODUCTOS + IMÁGENES
// ============================================================
async function cargarProductos() {
  // categoriaId 1 = Celulares, 2 = Accesorios
  const productos = [
    {
      nombre: "Samsung Galaxy A50",
      modeloId: 1,
      descripcion: "Smartphone Samsung Galaxy A50 con 128 GB de almacenamiento, pantalla AMOLED de 6.4\" y cámara triple.",
      categoriaId: 1,
      precio: 349999,
      almacenamientoGb: 128,
      stock: 12,
      pesoG: 166,
      imagenes: [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "iPhone 17 Pro Max",
      modeloId: 4,
      descripcion: "Smartphone Apple iPhone 17 Pro Max con 256 GB, chip A19 Pro y sistema de cámaras profesionales.",
      categoriaId: 1,
      precio: 1899999,
      almacenamientoGb: 256,
      stock: 8,
      pesoG: 221,
      imagenes: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Xiaomi Redmi Note 13",
      modeloId: 3,
      descripcion: "Smartphone Xiaomi Redmi Note 13 con 128 GB, pantalla AMOLED 120Hz y cámara de 108 MP.",
      categoriaId: 1,
      precio: 279999,
      almacenamientoGb: 128,
      stock: 20,
      pesoG: 188,
      imagenes: [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Cable Lightning a USB-C (2m)",
      modeloId: 5,
      descripcion: "Cable Apple Lightning a USB-C de 2 metros, certificado MFi, ideal para carga rápida y sincronización.",
      categoriaId: 2,
      precio: 8999,
      almacenamientoGb: null,
      stock: 50,
      pesoG: 60,
      imagenes: [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Funda Silicona Samsung",
      modeloId: 2,
      descripcion: "Funda de silicona suave para Samsung Galaxy A52, protección contra golpes y caídas.",
      categoriaId: 2,
      precio: 4500,
      almacenamientoGb: null,
      stock: 35,
      pesoG: 40,
      imagenes: [
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Cargador 20W USB-C",
      modeloId: 5,
      descripcion: "Cargador Apple de 20W USB-C con cable incluido, compatible con iPhone y iPad.",
      categoriaId: 2,
      precio: 15999,
      almacenamientoGb: null,
      stock: 25,
      pesoG: 90,
      imagenes: [
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
      ],
    },
  ];

  for (const item of productos) {
    const { imagenes, ...datosProducto } = item;

    const [producto, creado] = await PRODUCTO.findOrCreate({
      where: { nombre: item.nombre },
      defaults: datosProducto,
    });
    console.log(`Producto ${creado ? "creado" : "ya existía"}: ${producto.nombre}`);

    // Cargar imágenes solo si el producto es nuevo
    if (creado && imagenes && imagenes.length > 0) {
      for (let i = 0; i < imagenes.length; i++) {
        await IMAGEN_PRODUCTO.create({
          productoId: producto.id,
          imagenUrl: imagenes[i],
          orden: i + 1,
        });
      }
      console.log(`  → ${imagenes.length} imagen(es) cargada(s)`);
    }
  }
}

// ============================================================
// CLIENTES
// ============================================================
async function cargarClientes() {
  const clientes = [
    {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@ejemplo.com",
      telefono: "1122334455",
      direccion: "Calle Falsa 123",
      password: "123456",
    },
    {
      nombre: "María",
      apellido: "Gómez",
      email: "maria.gomez@ejemplo.com",
      telefono: "1155443322",
      direccion: "Av. Siempre Viva 742",
      password: "123456",
    },
    {
      nombre: "Carlos",
      apellido: "López",
      email: "carlos.lopez@ejemplo.com",
      telefono: "3415556677",
      direccion: "Bulevar Oroño 456",
      password: "123456",
    },
  ];

  for (const item of clientes) {
    item.password = await encriptarPassword(item.password);
    const [cliente, creado] = await CLIENTE.findOrCreate({
      where: { email: item.email },
      defaults: item,
    });
    if (creado) {
      console.log(`Cliente creado: ${cliente.nombre} ${cliente.apellido}`);
    } else {
      console.log(`Cliente ya existía: ${cliente.email}`);
    }
  }
}

// ============================================================
// EMPLEADOS
// ============================================================
async function cargarEmpleados() {
  const empleados = [
    {
      nombre: "Juan",
      apellido: "Pérez",            
      email: "admin@celulartech.com",
      password: "12asdasAA345",
      rolId: 1,
    },
    {
      nombre: "María",
      apellido: "Gómez",            
      email: "staff1@celulartech.com",
      password: "12asdasAA345",
      rolId: 2,
    },
  ];

  for (const item of empleados) {
    item.password = await encriptarPassword(item.password);
    const [empleado, creado] = await EMPLEADO.findOrCreate({
      where: { email: item.email },
      defaults: item,
    });
    if (creado) {
      console.log(`Empleado creado: ${empleado.nombre} ${empleado.apellido}`);
    } else {
      console.log(`Empleado ya existía: ${empleado.email}`);
    }
  }
}

// ============================================================
// RUN
// ============================================================
const runSeed = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");

    await sequelize.sync({ force: true });
    console.log("✅ Base de datos sincronizada");

    await cargarRoles();
    await cargarMarcas();
    await cargarModelos();
    await cargarCategorias();
    await cargarProductos();
    await cargarClientes();
    await cargarEmpleados();

    console.log("\n🎉 Seed completado correctamente.");
  } catch (error) {
    console.error("Error al ejecutar el seed:", error);
  } finally {
    await sequelize.close();
  }
};

runSeed();