// index.js (en la raíz del proyecto)
import express from "express";

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware básico para parsear JSON
app.use(express.json());


// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Backend funcionando!");
});

// Iniciar servidor 
async function startServer() {
  try {
    // Inicia el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
}

startServer();
