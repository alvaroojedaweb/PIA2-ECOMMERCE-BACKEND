import { loadEnvFile } from 'node:process';
import cors from 'cors'
import express from 'express';
import sequelize from './src/config/db.config.js';
import routes from './src/routes/index.routes.js';

loadEnvFile()

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware 
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));


// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Enrutador principal centralizado
app.use('/api', routes);


// Iniciar servidor 
async function startServer() {
  try {
    // Inicia el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ force: false });
    console.log('✅ Base de datos sincronizada');

  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
}

startServer();
