import Cart from '../models/cart.js';

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
            throw new Error('Carrito no encontrado'); } 
         const productIndex = cart.products.findIndex(item => item.productId.toString() === productId); 
        if (productIndex !== -1) { cart.products[productIndex].quantity += quantity; 
        } else { 
            cart.products.push({ cartId, productId, quantity });
        } await cart.save(); 
        return cart; 
    };

    // Obtener un carrito por ID
    getCartById = async (cartId) => {
        try {
          const cart = await Cart.findById(cartId).populate('products.productId');
          if (!cart) {
            throw new Error('Carrito no encontrado');
          }
          return cart;
        } catch (error) {
          throw new Error('Carrito no encontrado');
        }
      };
    
    // Obtener todos los carritos
    getAllCarts = async () => {
        const carts = await Cart.find();
        return carts;
    };
}

export default CartManager;
