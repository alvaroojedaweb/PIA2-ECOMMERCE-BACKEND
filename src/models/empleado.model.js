import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const EMPLEADO = sequelize.define('EMPLEADO', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'EMPLEADOPKID'
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'NOMBRE'
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'EMAIL'
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'PASSWORD'
  },

  rolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ROLID'
  }
}, {
  tableName: 'EMPLEADO',
  timestamps: true,
  // Por defecto NUNCA se devuelve el hash. Igual que en CLIENTE.
  defaultScope: { attributes: { exclude: ['password'] } },
  // Scope vacío = todos los campos. Solo para el login, que necesita el hash.
  scopes: { conPassword: {} },
});

export default EMPLEADO;