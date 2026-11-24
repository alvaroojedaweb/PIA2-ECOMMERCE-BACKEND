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
  ORDEN_COMPRA,
  ITEM_ORDEN_COMPRA,
} = db;
import { encriptarPassword } from "../src/utils/auth.js";

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

async function cargarMarcas() {
  const marcas = [
    { id: 1, nombre: "Samsung" },
    { id: 2, nombre: "Xiaomi" },
    { id: 3, nombre: "Apple" },
    { id: 4, nombre: "Motorola" },
    { id: 5, nombre: "Sony" },
  ];
  for (const item of marcas) {
    const [marca] = await MARCA.findOrCreate({
      where: { nombre: item.nombre },
      defaults: item,
    });
    console.log(`Marca creada: ${marca.nombre}`);
  }
}

async function cargarModelos() {
  const modelos = [
    { id: 1, nombre: "Galaxy A55 5G", marcaId: 1 },
    { id: 2, nombre: "Galaxy S24 Ultra", marcaId: 1 },
    { id: 3, nombre: "Redmi Note 13 Pro", marcaId: 2 },
    { id: 4, nombre: "Redmi Note 14", marcaId: 2 },
    { id: 5, nombre: "iPhone 16 Pro Max", marcaId: 3 },
    { id: 6, nombre: "iPhone 15", marcaId: 3 },
    { id: 7, nombre: "Accesorios Apple", marcaId: 3 },
    { id: 8, nombre: "Moto G84 5G", marcaId: 4 },
    { id: 9, nombre: "Edge 50 Pro", marcaId: 4 },
    { id: 10, nombre: "Audio & Accesorios", marcaId: 5 },
  ];
  for (const item of modelos) {
    const [modelo] = await MODELO.findOrCreate({
      where: { nombre: item.nombre },
      defaults: item,
    });
    console.log(`Modelo creado: ${modelo.nombre}`);
  }
}

async function cargarCategorias() {
  const categorias = [
    { id: 1, nombre: "Celulares" },
    { id: 2, nombre: "Accesorios" },
  ];
  for (const item of categorias) {
    const [categoria] = await CATEGORIA.findOrCreate({
      where: { nombre: item.nombre },
      defaults: item,
    });
    console.log(`Categoría creada: ${categoria.nombre}`);
  }
}

async function cargarProductos() {
  const productos = [
    {
      nombre: "iPhone 16 Pro Max 256GB",
      modeloId: 5,
      descripcion: "Titanio natural, chip A18 Pro, pantalla Super Retina XDR de 6.9 pulgadas y sistema de cámaras Pro con teleobjetivo 5x.",
      categoriaId: 1,
      precio: 1899999,
      almacenamientoGb: 256,
      stock: 8,
      pesoG: 227,
      imagenes: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Samsung Galaxy S24 Ultra 512GB",
      modeloId: 2,
      descripcion: "Pantalla Dynamic AMOLED 2X QHD+ de 6.8\", procesador Snapdragon 8 Gen 3, cámara de 200 MP y S-Pen integrado.",
      categoriaId: 1,
      precio: 1749999,
      almacenamientoGb: 512,
      stock: 6,
      pesoG: 232,
      imagenes: [
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Xiaomi Redmi Note 14 256GB",
      modeloId: 4,
      descripcion: "Pantalla AMOLED 120Hz de 6.67\", cámara principal de 108 MP con IA, batería de 5500 mAh y carga turbo de 33W.",
      categoriaId: 1,
      precio: 389999,
      almacenamientoGb: 256,
      stock: 18,
      pesoG: 196,
      imagenes: [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Samsung Galaxy A55 5G 128GB",
      modeloId: 1,
      descripcion: "Marco metálico premium, pantalla Super AMOLED Vision Booster de 6.6\", resistencia al agua IP67 y triple cámara de 50 MP.",
      categoriaId: 1,
      precio: 549999,
      almacenamientoGb: 128,
      stock: 14,
      pesoG: 213,
      imagenes: [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Motorola Edge 50 Pro 512GB",
      modeloId: 9,
      descripcion: "Pantalla curva pOLED de 144Hz validada por Pantone, carga TurboPower de 125W incluida y cámara con enfoque láser.",
      categoriaId: 1,
      precio: 799999,
      almacenamientoGb: 512,
      stock: 9,
      pesoG: 186,
      imagenes: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Apple iPhone 15 128GB",
      modeloId: 6,
      descripcion: "Dynamic Island, cámara principal de 48 MP con teleobjetivo 2x, chip A16 Bionic y conector USB-C.",
      categoriaId: 1,
      precio: 1299999,
      almacenamientoGb: 128,
      stock: 10,
      pesoG: 171,
      imagenes: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Xiaomi Redmi Note 13 Pro 256GB",
      modeloId: 3,
      descripcion: "Cámara de 200 MP con estabilización óptica OIS, pantalla AMOLED FHD+ y carga rápida de 67W.",
      categoriaId: 1,
      precio: 429999,
      almacenamientoGb: 256,
      stock: 15,
      pesoG: 188,
      imagenes: [
        "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Motorola Moto G84 5G 256GB",
      modeloId: 8,
      descripcion: "Acabado en cuero vegano, 12GB de RAM, pantalla pOLED de 6.5\" y sonido Dolby Atmos estéreo.",
      categoriaId: 1,
      precio: 359999,
      almacenamientoGb: 256,
      stock: 3,
      pesoG: 168,
      imagenes: [
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1533228100845-08145b01de14?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Auriculares Sony WH-1000XM5",
      modeloId: 10,
      descripcion: "Cancelación de ruido líder con 8 micrófonos, hasta 30 horas de batería y conexión multipunto Bluetooth.",
      categoriaId: 2,
      precio: 459999,
      almacenamientoGb: null,
      stock: 12,
      pesoG: 250,
      imagenes: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Cargador Rápido Apple 20W USB-C",
      modeloId: 7,
      descripcion: "Adaptador de corriente original USB-C de 20W para carga rápida segura en iPhone, iPad y AirPods.",
      categoriaId: 2,
      precio: 34999,
      almacenamientoGb: null,
      stock: 30,
      pesoG: 90,
      imagenes: [
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Cable Trenzado USB-C a Lightning 2m",
      modeloId: 7,
      descripcion: "Cable reforzado de 2 metros certificado MFi para carga rápida y transferencia de datos de alta velocidad.",
      categoriaId: 2,
      precio: 18999,
      almacenamientoGb: null,
      stock: 45,
      pesoG: 60,
      imagenes: [
        "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Funda Silicona MagSafe Soft-Touch",
      modeloId: 1,
      descripcion: "Interior de microfibra suave, exterior antideslizante y protección reforzada en bordes y módulo de cámaras.",
      categoriaId: 2,
      precio: 14500,
      almacenamientoGb: null,
      stock: 40,
      pesoG: 40,
      imagenes: [
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "Auriculares Inalámbricos TWS Pro",
      modeloId: 10,
      descripcion: "Estuche de carga rápida USB-C, resistencia al sudor IPX4 y 24 horas de autonomía combinada.",
      categoriaId: 2,
      precio: 64999,
      almacenamientoGb: null,
      stock: 22,
      pesoG: 55,
      imagenes: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      nombre: "PowerBank Carga Rápida 20.000 mAh",
      modeloId: 10,
      descripcion: "Batería portátil de alta capacidad con doble salida USB-C Power Delivery de 22.5W y display digital.",
      categoriaId: 2,
      precio: 52999,
      almacenamientoGb: null,
      stock: 0,
      pesoG: 340,
      imagenes: [
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
      ],
    },
  ];

  const creados = [];
  for (const item of productos) {
    const { imagenes, ...datosProducto } = item;
    const [producto, creado] = await PRODUCTO.findOrCreate({
      where: { nombre: item.nombre },
      defaults: datosProducto,
    });
    console.log(`Producto ${creado ? "creado" : "ya existía"}: ${producto.nombre}`);
    creados.push(producto);

    if (imagenes && imagenes.length > 0) {
      await IMAGEN_PRODUCTO.destroy({ where: { productoId: producto.id } });
      for (let i = 0; i < imagenes.length; i++) {
        await IMAGEN_PRODUCTO.create({
          productoId: producto.id,
          imagenUrl: imagenes[i],
          orden: i + 1,
        });
      }
    }
  }
  return creados;
}
async function cargarClientes() {
  const clientes = [
    {
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@ejemplo.com",
      telefono: "3515123456",
      direccion: "Av. Colón 1250, Córdoba",
      password: "123456",
      emailConfirmado: true,
    },
    {
      nombre: "María",
      apellido: "Gómez",
      email: "maria.gomez@ejemplo.com",
      telefono: "3516987654",
      direccion: "Bv. San Juan 450, Córdoba",
      password: "123456",
      emailConfirmado: true,
    },
  ];

  const creados = [];
  for (const item of clientes) {
    item.password = await encriptarPassword(item.password);
    const [cliente] = await CLIENTE.findOrCreate({
      where: { email: item.email },
      defaults: item,
    });
    console.log(`Cliente cargado: ${cliente.nombre} ${cliente.apellido}`);
    creados.push(cliente);
  }
  return creados;
}

async function cargarEmpleados() {
  const empleados = [
    {
      nombre: "Admin",
      apellido: "CelularTech",
      email: "admin@celulartech.com",
      password: "12asdasAA345",
      rolId: 1,
    },
    {
      nombre: "Soporte",
      apellido: "Staff",
      email: "staff1@celulartech.com",
      password: "12asdasAA345",
      rolId: 2,
    },
  ];

  for (const item of empleados) {
    item.password = await encriptarPassword(item.password);
    const [empleado] = await EMPLEADO.findOrCreate({
      where: { email: item.email },
      defaults: item,
    });
    console.log(`Empleado cargado: ${empleado.email}`);
  }
}

async function cargarOrdenesDemo(clientes, productos) {
  if (!ORDEN_COMPRA || !ITEM_ORDEN_COMPRA || clientes.length === 0 || productos.length < 4) return;

  const orden1 = await ORDEN_COMPRA.create({
    clienteId: clientes[0].id,
    total: Number(productos[2].precio) + Number(productos[9].precio),
    estado: "enviada",
    direccionEnvio: "Av. Colón 1250, Córdoba Capital",
    notas: "Entregar en recepción de 9 a 18 hs.",
  });

  await ITEM_ORDEN_COMPRA.bulkCreate([
    {
      ordenCompraId: orden1.id,
      productoId: productos[2].id,
      cantidad: 1,
      precioUnitario: productos[2].precio,
      subtotal: productos[2].precio,
    },
    {
      ordenCompraId: orden1.id,
      productoId: productos[9].id,
      cantidad: 1,
      precioUnitario: productos[9].precio,
      subtotal: productos[9].precio,
    },
  ]);

  const orden2 = await ORDEN_COMPRA.create({
    clienteId: clientes[1].id,
    total: Number(productos[3].precio),
    estado: "enviada",
    direccionEnvio: "Bv. San Juan 450, Piso 3, Córdoba",
    notas: "Timbre 3B.",
  });

  await ITEM_ORDEN_COMPRA.create({
    ordenCompraId: orden2.id,
    productoId: productos[3].id,
    cantidad: 1,
    precioUnitario: productos[3].precio,
    subtotal: productos[3].precio,
  });

  console.log("✅ 2 órdenes de compra demo cargadas.");
}

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
    const productos = await cargarProductos();
    const clientes = await cargarClientes();
    await cargarEmpleados();
    await cargarOrdenesDemo(clientes, productos);

    console.log("\n🎉 Seed completado correctamente con 14 productos y órdenes de ejemplo.");
  } catch (error) {
    console.error("Error al ejecutar el seed:", error);
  } finally {
    await sequelize.close();
  }
};

runSeed();




