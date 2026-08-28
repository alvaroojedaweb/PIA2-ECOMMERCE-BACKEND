
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const ITEM_ORDEN_COMPRA = sequelize.define('ITEM_ORDEN_COMPRA', {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ITEMORDENCOMPRAPKID'
  },
  
  ordenCompraId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ORDENCOMPRAPKID' 
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
    validate: {
      min: 1
    },
    field: 'CANTIDAD' 
  },
 
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'PRECIOUNITARIO'
  },
  
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'SUBTOTAL'
  }
}, {
  tableName: 'ITEM_ORDEN_COMPRA',
  timestamps: true
});

export default ITEM_ORDEN_COMPRA;