import CartManager from '../controllers/cartManager.js';

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
  const { quantity } = req.body;

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
    res.render('cartDetail', { cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el carrito');
  }
};

// Obtener todos los carritos
export const getAllCarts = async (req, res) => {
    try {
      const carts = await cartManager.getAllCarts();
      res.render('carts', { carts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los carritos' });
    }
  };
  

// Eliminar un producto del carrito
export const removeProduct = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await cartManager.removeProduct(cid, pid);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
  }
};

// Actualizar el carrito completo
export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const updatedCart = await cartManager.updateCart(cid, products);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la cantidad del producto en el carrito' });
  }
};

// Vaciar el carrito
export const clearCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const clearedCart = await cartManager.clearCart(cid);
    res.status(200).json(clearedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al vaciar el carrito' });
  }
};
