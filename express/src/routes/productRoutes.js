//productRoutes
import express from 'express';
import { getProducts, getProductById, create, update, remove } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts); 
router.get('/:id', getProductById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
