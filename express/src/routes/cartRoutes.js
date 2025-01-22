//cartRoutes
import express from 'express';
import { createCart, addProductToCart, getCartById, getAllCarts, removeProduct, updateCart, updateProductQuantity, clearCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/cart', createCart);
router.post('/cart/:id/productos', addProductToCart);
router.get('/cart/:id', getCartById);
router.get('/carts', getAllCarts);
router.delete('/cart/:cid/product/:pid', removeProduct);
router.put('/cart/:cid', updateCart);
router.put('/cart/:cid/product/:pid', updateProductQuantity);
router.delete('/cart/:cid', clearCart);

export default router;
