import { loadEnvFile } from 'node:process';
import { Sequelize } from 'sequelize';

//carga de variables de entorno .env de forma nativa (Node.js v20.6.0 o superior requerido)
loadEnvFile() 

// Extrae las variables de entorno
const dbName = process.env.DB_NAME || 'mi_proyecto_db';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbDialect = process.env.DB_DIALECT || 'mysql';
const dbPort = process.env.DB_PORT || 3306;

// Crea una instancia de Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
    logging: false, // Desactiva los logs SQL
});

// Exporta la instancia para usarla en otros lugares
export default sequelize;