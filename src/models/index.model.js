import sequelize from '../config/db.config.js';
import CLIENTE from './cliente.model.js'; 
import EMPLEADO from './empleado.model.js';
import MARCA from './marca.model.js'; 
import MODELO from './modelo.model.js';
import PRODUCTO from './producto.model.js';
import IMAGEN_PRODUCTO from './imagenProducto.model.js';
import ITEM_CARRITO from './itemCarrito.model.js'; 
import ORDEN_COMPRA from './ordenCompra.model.js';
import ITEM_ORDEN_COMPRA from './itemOrdenCompra.model.js';

// Relaciones Marca - Modelo
MARCA.hasMany(MODELO, { foreignKey: 'marcaId' });
MODELO.belongsTo(MARCA, { foreignKey: 'marcaId' });

// Relaciones Modelo - Producto
MODELO.hasMany(PRODUCTO, { foreignKey: 'modeloId' });
PRODUCTO.belongsTo(MODELO, { foreignKey: 'modeloId' });

// Relaciones Producto - ImagenProducto
PRODUCTO.hasMany(IMAGEN_PRODUCTO, { foreignKey: 'productoId', as: 'imagenes' });
IMAGEN_PRODUCTO.belongsTo(PRODUCTO, { foreignKey: 'productoId', as: 'producto' });

// Relaciones Cliente - ItemCarrito
CLIENTE.hasMany(ITEM_CARRITO, { foreignKey: 'clienteId' });
ITEM_CARRITO.belongsTo(CLIENTE, { foreignKey: 'clienteId' });

// Relaciones Producto - ItemCarrito
PRODUCTO.hasMany(ITEM_CARRITO, { foreignKey: 'productoId' });
ITEM_CARRITO.belongsTo(PRODUCTO, { foreignKey: 'productoId' });

// Relaciones Cliente / Empleado - OrdenCompra
CLIENTE.hasMany(ORDEN_COMPRA, { foreignKey: 'clienteId' });
ORDEN_COMPRA.belongsTo(CLIENTE, { foreignKey: 'clienteId' });

EMPLEADO.hasMany(ORDEN_COMPRA, { foreignKey: 'empleadoId' });
ORDEN_COMPRA.belongsTo(EMPLEADO, { foreignKey: 'empleadoId' });

// Relaciones OrdenCompra - ItemOrdenCompra - Producto
ORDEN_COMPRA.hasMany(ITEM_ORDEN_COMPRA, { foreignKey: 'ordenCompraId' });
ITEM_ORDEN_COMPRA.belongsTo(ORDEN_COMPRA, { foreignKey: 'ordenCompraId' });

PRODUCTO.hasMany(ITEM_ORDEN_COMPRA, { foreignKey: 'productoId' });
ITEM_ORDEN_COMPRA.belongsTo(PRODUCTO, { foreignKey: 'productoId' });

// Objeto con todos los modelos para acceso unificado
const db = {
  sequelize,
  CLIENTE,
  EMPLEADO,
  MARCA,
  MODELO,
  PRODUCTO,
  IMAGEN_PRODUCTO,
  ITEM_CARRITO,
  ORDEN_COMPRA,
  ITEM_ORDEN_COMPRA
};

export { 
  sequelize,
  CLIENTE,
  EMPLEADO,
  MARCA,
  MODELO,
  PRODUCTO,
  IMAGEN_PRODUCTO,
  ITEM_CARRITO,
  ORDEN_COMPRA,
  ITEM_ORDEN_COMPRA };

export default db;