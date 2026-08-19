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
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'APELLIDO'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'EMAIL'
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'PUESTO'
  }
}, {
  tableName: 'EMPLEADOS',
  timestamps: true
});

export default EMPLEADO;