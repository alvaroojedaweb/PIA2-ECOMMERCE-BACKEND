import sequelize from '../config/db.config.js';
import PRODUCTO from './productos.model.js';

// Objeto con todos los modelos para acceso unificado
const db = {
  sequelize,
  PRODUCTO
};

// Configurar asociaciones (relaciones) si existen en el futuro
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { sequelize, PRODUCTO };
export default db;