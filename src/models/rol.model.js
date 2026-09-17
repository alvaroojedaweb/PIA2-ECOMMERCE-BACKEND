import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const ROL = sequelize.define('ROL', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'ROLPKID'
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'NOMBRE'
    }

}, {
    tableName: 'ROL',
    timestamps: true
});

export default ROL;