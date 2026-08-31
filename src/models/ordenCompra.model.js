import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const ORDEN_COMPRA = sequelize.define('ORDEN_COMPRA', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ORDENCOMPRAPKID' 
  },

  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'CLIENTEPKID' 
  },

    
  empleadoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'EMPLEADOPKID'
  },

  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'FECHA'
  },

  estado: {
    type: DataTypes.ENUM(
      'pendiente',
      'confirmada',
      'enviada',
      'entregada',
      'cancelada'
    ),
    defaultValue: 'pendiente',
    field: 'ESTADO'
  },

  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    field: 'TOTAL'
  },

  direccionEnvio: {
    type: DataTypes.TEXT,
    field: 'DIRECCIONENVIO'
  },

  notas: {
    type: DataTypes.TEXT,
    field: 'NOTAS'    
  }

}, {
  tableName: 'ORDEN_COMPRA',
  timestamps: true
});

export default ORDEN_COMPRA;