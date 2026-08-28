import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const IMAGEN_PRODUCTO = sequelize.define('IMAGEN_PRODUCTO', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'IMAGENPRODUCTOPKID' 
  },
  
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'PRODUCTOPKID' 
  },
  
  imagenUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'IMAGENURL' 
  },
  
  orden: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    field: 'ORDEN'  
  }
}, {
  tableName: 'IMAGEN_PRODUCTO',
  timestamps: true
});

export default IMAGEN_PRODUCTO;