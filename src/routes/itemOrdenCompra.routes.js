import { Router } from 'express';
import { getAll, create, hardDelete } from '../controllers/itemOrdenCompra.controllers.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.delete('/:id/hard', hardDelete);

export default router;