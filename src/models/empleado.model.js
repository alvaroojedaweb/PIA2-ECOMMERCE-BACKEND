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

  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'PASSWORD'
  },
  
  rol: {
    type: DataTypes.ENUM('Staff', 'Admin'),
    allowNull: false,
    defaultValue: 'Staff',
    field: 'ROL'
  }
}, {
  tableName: 'EMPLEADO',
  timestamps: true
});

export default EMPLEADO;