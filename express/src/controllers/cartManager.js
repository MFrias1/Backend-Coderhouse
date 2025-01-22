import Cart from '../models/cart.js';

class CartManager {
    // Crear un nuevo carrito vacío
    createCart = async () => {
      try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        console.log('Nuevo carrito creado:', newCart._id); // Agregar log para verificar creación
        return newCart;
      } catch (error) {
        console.error(`Error específico al crear el carrito: ${error.message}`);
        throw new Error(`Error específico al crear el carrito: ${error.message}`);
      }
    };
    clearCart = async (cartId) => {
      try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
          throw new Error(`Carrito con ID ${cartId} no encontrado`);
        }
        cart.products = [];
        await cart.save();
        return cart;
      } catch (error) {
        console.error(`Error específico al vaciar el carrito: ${error.message}`);
        throw new Error(`Error específico al vaciar el carrito: ${error.message}`);
      }
    };

    // Agregar un producto al carrito
    addProductToCart = async (cartId, productId, quantity) => {
        try {
          const cart = await Cart.findById(cartId);
          if (!cart) {
            throw new Error(`Carrito con ID ${cartId} no encontrado`);
          }
          const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
          if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
          } else {
            cart.products.push({ productId, quantity });
          }
          await cart.save();
          return cart;
        } catch (error) {
          console.error(`Error específico al agregar el producto al carrito: ${error.message}`);
          throw new Error(`Error específico al agregar el producto al carrito: ${error.message}`);
        }
    };

    // Obtener un carrito por ID
    getCartById = async (cartId) => {
      try {
        const cart = await Cart.findById(cartId).populate('products.productId');
        if (!cart) {
          throw new Error(`Carrito con ID ${cartId} no encontrado`);
        }
        return cart;
      } catch (error) {
        console.error(`Error específico al obtener el carrito: ${error.message}`);
        throw new Error(`Error específico al obtener el carrito: ${error.message}`);
      }
    };
    
    // Obtener todos los carritos
    getAllCarts = async () => {
        const carts = await Cart.find();
        return carts;
    };
}

export default CartManager;
