import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const PRODUCTO = sequelize.define('PRODUCTO', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'PRODUCTOPKID'
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DESCRIPCION'
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0 
    },
    field: 'PRECIO'
  },
  categoria: {
    type: DataTypes.ENUM('CELULARES', 'ACCESORIOS'),
    allowNull: false,
    field: 'CATEGORIA'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'NOMBRE'
  },
  almacenamientoGb: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    field: 'ALMACENAMIENTO_GB'
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    field: 'STOCK'
  },
  pesoG: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    field: 'PESO_G'
  },
  modeloId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'MODELOPKID'
  }
}, {
  tableName: 'PRODUCTO',
  timestamps: true
});

export default PRODUCTO;