// controllers/productController.js
import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        // lógica para obtener productos
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los productos');
    }
};

export const getProductById = async (req, res) => {
    try {
        // lógica para obtener un producto por ID
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el producto');
    }
};

export const create = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send('Producto creado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el producto');
    }
};

export const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.send('Producto actualizado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.send('Producto eliminado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
};

// Asegúrate de exportar todas las funciones correctamente
export default {
    getProducts,
    getProductById,
    create,
    update,
    remove
};
