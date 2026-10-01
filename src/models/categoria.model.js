import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const CATEGORIA = sequelize.define('CATEGORIA', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'CATEGORIAPKID'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'NOMBRE'
  }
}, {
  tableName: 'CATEGORIA',
  timestamps: true
});

export default CATEGORIA;