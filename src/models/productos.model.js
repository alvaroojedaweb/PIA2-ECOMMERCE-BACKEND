import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const PRODUCTO = sequelize.define('PRODUCTO', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'PRODUCTOPKID'
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'DESCRIPCION'
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0 // Evita precios negativos
    },
    field: 'PRECIO'
  },
  categoria: {
    type: DataTypes.ENUM('CELULARES', 'ACCESORIOS'),
    allowNull: false,
    field: 'CATEGORIA'
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'NOMBRE'
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'MARCA'
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'MODELO'
  },
  colorNombre: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'COLOR_NOMBRE'
  },
  colorHexadecimal: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'COLOR_HEXADECIMAL'
  },
  almacenamientoMb: {
    type: DataTypes.INTEGER,
    allowNull: true, // Opcional, por si es de categoría ACCESORIOS
    field: 'ALMACENAMIENTO_MB'
  },
  pesoG: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    field: 'STOCK'
  },  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    },
    field: 'PESO_G' //PESO EN GRAMOS
  }
}, {
  tableName: 'PRODUCTOS',
  timestamps: true
});

export default PRODUCTO;