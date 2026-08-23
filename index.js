import { loadEnvFile } from 'node:process';
import express from "express";
import cors from "cors";
import helmet from "helmet";
import sequelize from './src/config/db.config.js';
/*
// Importación de rutas
import productoRoutes from './src/routes/productos.routes.js';
import ordenCompraRoutes from './src/routes/ordenCompra.Routes.js';
import itemOrdenCompraRoutes from './src/routes/itemOrdenCompra.Routes.js';
import clientesRoutes from './src/routes/clientes.Routes.js';
*/
import routes from './src/routes/index.js';
// Cargar variables de entorno
loadEnvFile();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// ===== MIDDLEWARES =====
// Seguridad
app.use(helmet());
app.use(cors());

// Parseo de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging de peticiones (opcional pero útil)
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.url}`);
  next();
});

// ===== RUTAS =====
// Ruta de health check
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send("🚀 Backend de E-Commerce funcionando!");
});
/*
// Rutas de la API
app.use('/api', clientesRoutes);
app.use('/api', productoRoutes);
app.use('/api', ordenCompraRoutes);
app.use('/api', itemOrdenCompraRoutes);
*/
app.use('/', routes);

// ===== MANEJO DE ERRORES =====
// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.url}`
  });
});

// Middleware para errores generales
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ===== INICIO DEL SERVIDOR =====
async function startServer() {
  try {
    // Verificar conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // Sincronizar modelos (force: false para no perder datos en producción)
    const forceSync = process.env.NODE_ENV === 'development' && process.env.FORCE_SYNC === 'true';
    await sequelize.sync({ force: forceSync });
    console.log(`✅ Base de datos sincronizada${forceSync ? ' (force: true)' : ''}`);

    // Iniciar el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚 Documentación de API en http://localhost:${PORT}/health`);
    });

  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

// Manejar señales de terminación
process.on('SIGTERM', () => {
  console.log('🛑 Recibida señal SIGTERM, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Recibida señal SIGINT, cerrando servidor...');
  process.exit(0);
});

// Iniciar servidor
startServer();

export default app;























/*import { loadEnvFile } from 'node:process';
import express from "express";
import sequelize from './src/config/db.config.js';
import productoRoutes from './src/routes/productos.routes.js'
//cambio de prueba

loadEnvFile()
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware básico para parsear JSON
app.use(express.json());


// Rutas
app.get("/", (req, res) => {
  res.send("¡Backend funcionando!");
});
app.use(productoRoutes);


// Iniciar servidor 
async function startServer() {
  try {
    // Inicia el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    await sequelize.sync({ force: false }); //true solo en desarrollo
    console.log('✅ Base de datos sincronizada');

  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
}

startServer();*/
