import { loadEnvFile } from 'node:process';
import cors from 'cors';
import express from 'express';
import sequelize from './src/config/db.config.js';
import routes from './src/routes/index.routes.js';

loadEnvFile();

const app = express();
const PORT = process.env.APP_PORT || 2222;


app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true,
}));


app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

app.use('/api', routes);


app.use((req, res) => {
  res.status(404).json({
    estado: false,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});



app.use((err, req, res, next) => {
  console.error('❌ Error no manejado:', err);

  // Nunca exponer el stack trace en producción
  const respuesta = {
    estado: false,
    mensaje: err.message || 'Error interno del servidor',
  };

  // En desarrollo, mostrar más info para debug
  if (process.env.NODE_ENV !== 'production') {
    respuesta.detalle = err.stack;
  }

  res.status(err.status || 500).json(respuesta);
});


async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ force: false });
    console.log('✅ Base de datos sincronizada');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

startServer();