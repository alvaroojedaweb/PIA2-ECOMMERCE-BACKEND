import { EMPLEADO } from './src/models/index.model.js';
import { encriptarPassword } from './src/utils/auth.js';

async function crearEmpleadoPrueba() {
  try {
    const passwordEncriptada = await encriptarPassword('admin123');

    const nuevoEmpleado = await EMPLEADO.create({
      Nombre: 'Iván',
      Email: 'admin@ecommerce.com',
      Contraseña: passwordEncriptada, //
    });

    console.log('✅ Empleado creado con éxito:', nuevoEmpleado.toJSON());
  } catch (error) {
    console.error('❌ Error al crear empleado:', error.message);
  } finally {
    process.exit();
  }
}

crearEmpleadoPrueba();