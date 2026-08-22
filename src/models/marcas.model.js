import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const MARCA = sequelize.define('MARCA', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'MARCAPKID'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'NOMBRE'
    },

}, {
    tableName: 'MARCAS',
    timestamps: true
});

export default MARCA;