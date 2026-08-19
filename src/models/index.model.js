import sequelize from '../config/db.config.js';
import MARCA from './marcas.model.js';
import PRODUCTO from './productos.model.js';

// Objeto con todos los modelos para acceso unificado
const db = {
  sequelize,
  MARCA,
  PRODUCTO
};

// Configurar asociaciones (relaciones) si existen en el futuro
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { sequelize, MARCA, PRODUCTO };
export default db;