
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const CLIENTE = sequelize.define('CLIENTE', {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'CLIENTEPKID'   
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,   
        field: 'NOMBRE'    
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'APELLIDO' 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,      
        unique: true,
        field: 'EMAIL'          
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'TELEFONO' 
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true,       
        field: 'DIRECCION'     
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,      
        field: 'PASSWORD' 
    },
}, {
    tableName: 'CLIENTE',    
    timestamps: true,        
  
});

export default CLIENTE;
