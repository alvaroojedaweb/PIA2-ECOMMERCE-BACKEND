import sequelize from '../config/db.config.js';
import MODELO from './modelos.model.js';
import MARCA from './marcas.model.js';
import PRODUCTO from './productos.model.js';
import EMPLEADO from './empleados.model.js';
import IMAGEN_PRODUCTO from './imagenProducto.model.js';
import ITEM_CARRITO from './itemCarrito.model.js';
import Cliente from './clientes.model.js';


// Relaciones
MARCA.hasMany(MODELO, { foreignKey: "marcaId" })
MODELO.belongsTo(MARCA, { foreignKey: "marcaId" })
MODELO.hasMany(PRODUCTO, { foreignKey: "modeloId" })
PRODUCTO.belongsTo(MODELO, { foreignKey: "modeloId" })
PRODUCTO.hasMany(IMAGEN_PRODUCTO, { foreignKey: 'ProductoID', as: 'imagenes' });
IMAGEN_PRODUCTO.belongsTo(PRODUCTO, { foreignKey: 'ProductoID', as: 'producto' });


//CLIENTE.hasMany(ITEM_CARRITO, { foreignKey: 'ClienteID' });
//ITEM_CARRITO.belongsTo(CLIENTE, { foreignKey: 'ClienteID' });


//CLIENTE.hasMany(ITEM_CARRITO, { foreignKey: 'ClienteID' });
//ITEM_CARRITO.belongsTo(CLIENTE, { foreignKey: 'ClienteID' });

//PRODUCTO.hasMany(ITEM_CARRITO, { foreignKey: 'ProductoID' });
//ITEM_CARRITO.belongsTo(PRODUCTO, { foreignKey: 'ProductoID' });

// Objeto con todos los modelos para acceso unificado
const db = {
  sequelize,
  MODELO,
  MARCA,
  PRODUCTO,
  EMPLEADO,
  IMAGEN_PRODUCTO,
  Cliente,
  ITEM_CARRITO
};

// Configurar asociaciones (relaciones) si existen en el futuro
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



// Configurar asociaciones
export { sequelize, MODELO, MARCA, PRODUCTO, EMPLEADO, IMAGEN_PRODUCTO, ITEM_CARRITO };
export default db;