// controllers/productController.js
import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = 'asc', query = {} } = req.query;

        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
        const parsedSort = sort === 'desc' ? -1 : 1;

     // paginación
        const skip = (parsedPage - 1) * parsedLimit;

        // Buscando productos con filtros 
        const products = await Product.find(query)
            .skip(skip)
            .limit(parsedLimit)
            .sort({ price: parsedSort });

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / parsedLimit);

        res.render('productos', {
            products,
            totalPages,
            currentPage: parsedPage
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los productos');
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('producto', { product });
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

export default {
    getProducts,
    getProductById,
    create,
    update,
    remove
};
