import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const EMPLEADO = sequelize.define('EMPLEADO', {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    
  },
  Contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Rol: {
    type: DataTypes.ENUM('Staff', 'Admin'),
    allowNull: false,
    defaultValue: 'Staff'
  }
}, {
  tableName: 'Empleado',
  timestamps: false
});
export default EMPLEADO;