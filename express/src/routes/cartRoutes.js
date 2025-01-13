import express from 'express';
import {
  createCart,
  addProductToCart,
  getCartById,
  getAllCarts,
  removeProduct,
  updateCart,
  updateProductQuantity,
  clearCart
} from '../controllers/cartController.js';

const routerCart = express.Router();

// Rutas para gestionar el carrito
routerCart.post('/', createCart);
routerCart.post('/:cartId/product/:productId', addProductToCart);
routerCart.get('/:cartId', getCartById);
routerCart.get('/carts', getAllCarts);
routerCart.delete('/:cid/products/:pid', removeProduct);
routerCart.put('/:cid', updateCart);
routerCart.put('/:cid/products/:pid', updateProductQuantity);
routerCart.delete('/:cid', clearCart);

export default routerCart;
