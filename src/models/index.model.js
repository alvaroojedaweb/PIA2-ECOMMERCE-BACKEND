import sequelize from '../config/db.config.js';
import MODELO from './modelos.model.js';
import MARCA from './marcas.model.js';
import PRODUCTO from './productos.model.js';

// Objeto con todos los modelos para acceso unificado
const db = {
  sequelize,
  MODELO,
  MARCA,
  PRODUCTO
};

// Configurar asociaciones

MARCA.hasMany(MODELO,
  { foreignKey: "marcaId" }
)

MODELO.belongsTo(MARCA,
  { foreignKey: "marcaId" }
)

MODELO.hasMany(PRODUCTO,
  { foreignKey: "modeloId" }
)

PRODUCTO.belongsTo(MODELO,
  { foreignKey: "modeloId" }
)

export { sequelize, MARCA, PRODUCTO };
export default db;