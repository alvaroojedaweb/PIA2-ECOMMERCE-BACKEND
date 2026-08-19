import sequelize from '../config/db.config.js';
import PRODUCTO from './productos.model.js';
import EMPLEADO from './empleados.model.js';

// Objeto con todos los modelos para acceso unificado
const db = {
  sequelize,
  PRODUCTO,
  EMPLEADO
};

// Configurar asociaciones (relaciones) si existen en el futuro
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { sequelize, PRODUCTO, EMPLEADO };
export default db;