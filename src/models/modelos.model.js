import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const MODELO = sequelize.define('MODELO', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'MODELOPKID'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'NOMBRE'
    },
    marcaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'MARCAPKID'
    }

}, {
    tableName: 'MODELOS',
    timestamps: true
});
export default MODELO;