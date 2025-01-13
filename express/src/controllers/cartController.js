import CartManager from '../managers/CartManager.js';

const cartManager = new CartManager();

// Crear un carrito
export const createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el carrito' });
    }
};

// Agregar un producto al carrito
export const addProductToCart = async (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;  // Asegúrate de que en el cuerpo de la solicitud se pase la cantidad

    try {
        const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
};

// Obtener todos los productos de un carrito
export const getCartById = async (req, res) => {
    const { cartId } = req.params;

    try {
        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};
