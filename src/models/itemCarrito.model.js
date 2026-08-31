import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const ITEM_CARRITO = sequelize.define('ITEM_CARRITO', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ITEMCARRITOPKID' 
  },
  
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'CLIENTEPKID'             
  },
  
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'PRODUCTOPKID'

  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    field: 'CANTIDAD' 
  },
  
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'PRECIO' 
  }
}, {
  tableName: 'ITEM_CARRITO',
  timestamps: true
});

export default ITEM_CARRITO;