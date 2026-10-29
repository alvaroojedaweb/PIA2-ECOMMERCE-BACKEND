// Cargar el .env ANTES de importar emailService
import { loadEnvFile } from "node:process";
loadEnvFile();

// Ahora sí, importar el servicio (ya tiene las variables cargadas)
const { enviarBienvenida } = await import("./src/services/emailService.js");

enviarBienvenida({
  nombre: "Juan",
  email: "juan.perez@ejemplo.com",
}).then(() => {
  console.log("Test completado");
  process.exit(0);
});