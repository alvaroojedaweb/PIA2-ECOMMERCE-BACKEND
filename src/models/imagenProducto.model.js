import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const IMAGEN_PRODUCTO = sequelize.define('ImagenProducto', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ImagenURL: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Orden: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1
  }
}, {
  tableName: 'ImagenProducto',
  timestamps: false
});

export default IMAGEN_PRODUCTO;