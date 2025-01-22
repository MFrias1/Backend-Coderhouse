//cartRoutes
import express from 'express';
import { createCart, addProductToCart, getCartById, getAllCarts, removeProduct, updateCart, updateProductQuantity, clearCart, getCartProducts } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:cartId/products', getCartProducts);//funciona
router.get('/:cartId', getCartById);//funciona
router.get('/', getAllCarts);//funciona
router.post('/', createCart);//funciona
router.post('/add', addProductToCart);//funciona
router.delete('/:cid/products/:pid', removeProduct);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);//funciona

export default router;


