import { Router } from "express";
import {
  getAll,
  getById,
  getMisOrdenes,
  create,
  update,
} from "../controllers/ordenCompra.controllers.js";
import { verificarAdmin, verificarCliente } from "../middleware/auth.js";

const router = Router();

// Cliente: ver sus propias órdenes y crear una nueva
router.get("/mis-ordenes", verificarCliente, getMisOrdenes);
router.post("/", verificarCliente, create);

// Detalle: cliente dueño o admin (la validación se hace en el controller)
// Necesitamos un middleware que acepte ambos. Lo hacemos con verificarCliente
// para clientes y con verificarAdmin para admins... pero eso requiere 2 rutas.
// Solución simple: aceptar ambos con verificarClienteOAdmin.
import { verificarClienteOAdmin } from "../middleware/auth.js";
router.get("/:id", verificarClienteOAdmin, getById);

// Admin: listar todas y actualizar estado
router.get("/", verificarAdmin, getAll);
router.put("/:id", verificarAdmin, update);

export default router;