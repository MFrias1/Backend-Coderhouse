//cartRoutes
import express from 'express';
import { createCart, addProductToCart, getCartById, getAllCarts, removeProduct, updateCart, updateProductQuantity, clearCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getAllCarts);
router.post('/', createCart);
router.post('/add', addProductToCart);
router.get('/:cartId', getCartById);
router.delete('/:cid/products/:pid', removeProduct);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);

export default router;
