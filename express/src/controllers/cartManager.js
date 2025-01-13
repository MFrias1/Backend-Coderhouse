import Cart from '../models/cart.js';
import Product from '../models/Product.js';

class CartManager {
    
    // Crear un nuevo carrito vacío
    createCart = async () => {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        return newCart;
    };

    // Agregar un producto al carrito
    addProductToCart = async (cartId, productId, quantity) => {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        // Verificar si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex !== -1) {
            // Si el producto ya está en el carrito, solo se incrementa la cantidad
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si el producto no está, se agrega como nuevo
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        return cart;
    };

    // Obtener un carrito por ID
    getCartById = async (cartId) => {
        const cart = await Cart.findById(cartId).populate('products.productId');
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart;
    };
}

export default CartManager;
