import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Cliente from './clientes.model.js';

const OrdenCompra = sequelize.define('OrdenCompra', {

  orden_compra_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,

    references: {
      model: 'clientes',
      key: 'id'
    }
  },

  empleado_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  estado: {
    type: DataTypes.ENUM(
      'pendiente',
      'confirmada',
      'enviada',
      'entregada',
      'cancelada'
    ),
    defaultValue: 'pendiente'
  },

  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },

  direccion_envio: {
    type: DataTypes.TEXT
  },

  notas: {
    type: DataTypes.TEXT
  }

}, {
  tableName: 'orden_compra',
  timestamps: true
});

// Relación Cliente -> OrdenCompra
OrdenCompra.belongsTo(Cliente, {
  foreignKey: 'cliente_id',
  targetKey: 'id'
});

Cliente.hasMany(OrdenCompra, {
  foreignKey: 'cliente_id',
  sourceKey: 'id'
});

export default OrdenCompra;