import { loadEnvFile } from 'node:process';
import express from "express";
import sequelize from './src/config/db.config.js';
import productoRoutes from './src/routes/productos.routes.js'
import empleadoRoutes from './src/routes/empleado.routes.js';
import imagenProductoRoutes from './src/routes/imagenProducto.routes.js';
import itemCarritoRoutes from './src/routes/itemCarrito.routes.js';
import authRoutes from './src/routes/auth.routes.js';
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
app.use(empleadoRoutes);
app.use(imagenProductoRoutes);
app.use(itemCarritoRoutes);
app.use(authRoutes);


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

startServer();
