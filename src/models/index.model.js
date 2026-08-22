import sequelize from '../config/db.config.js';
import MODELO from './modelos.model.js';
import MARCA from './marcas.model.js';
import PRODUCTO from './productos.model.js';
import EMPLEADO from './empleados.model.js';
import IMAGEN_PRODUCTO from './imagenProducto.model.js';

// Relaciones
MARCA.hasMany(MODELO,{ foreignKey: "marcaId" })
MODELO.belongsTo(MARCA,{ foreignKey: "marcaId" })
MODELO.hasMany(PRODUCTO,{ foreignKey: "modeloId" })
PRODUCTO.belongsTo(MODELO,{ foreignKey: "modeloId" })
PRODUCTO.hasMany(IMAGEN_PRODUCTO, { foreignKey: 'ProductoID', as: 'imagenes' });
IMAGEN_PRODUCTO.belongsTo(PRODUCTO, { foreignKey: 'ProductoID', as: 'producto' });


// Objeto con todos los modelos para acceso unificado
const db = { sequelize, MODELO, MARCA, PRODUCTO, EMPLEADO, IMAGEN_PRODUCTO };

// Configurar asociaciones
export { sequelize, MODELO, MARCA, PRODUCTO, EMPLEADO, IMAGEN_PRODUCTO };
export default db;