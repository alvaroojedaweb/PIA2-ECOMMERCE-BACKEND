import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const ITEM_CARRITO = sequelize.define('ItemCarrito', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ClienteID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  Precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'ItemCarrito',
  timestamps: true
});

export default ITEM_CARRITO;