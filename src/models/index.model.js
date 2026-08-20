import sequelize from '../config/db.config.js';
import PRODUCTO from './productos.model.js';
import EMPLEADO from './empleados.model.js';
import IMAGEN_PRODUCTO from './imagenProducto.model.js';

// Relaciones
PRODUCTO.hasMany(IMAGEN_PRODUCTO, { foreignKey: 'ProductoID', as: 'imagenes' });
IMAGEN_PRODUCTO.belongsTo(PRODUCTO, { foreignKey: 'ProductoID', as: 'producto' });

// Objeto con todos los modelos para acceso unificado
const db = {
  sequelize,
  PRODUCTO,
  EMPLEADO,
  IMAGEN_PRODUCTO
};

// Configurar asociaciones (relaciones) si existen en el futuro
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { sequelize, PRODUCTO, EMPLEADO, IMAGEN_PRODUCTO };
export default db;