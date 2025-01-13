import express from 'express';
import { createCart, addProductToCart, getCartById } from '../controllers/cartController.js';

const routerCart = express.Router();

// Ruta para crear un carrito
routerCart.post('/', createCart);

// Ruta para agregar un producto al carrito
routerCart.post('/:cartId/product/:productId', addProductToCart);

// Ruta para obtener un carrito por ID
routerCart.get('/:cartId', getCartById);

export default routerCart;
