import ProductManager from '../controllers/ProductManager.js';

const productManager = new ProductManager();

// Controlador para obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Configuración de opciones para la paginación y ordenamiento
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null,
        };

        // Filtro por categoría si se proporciona
        const filter = query ? { category: query } : {};

        // Obtener los productos desde el ProductManager
        const products = await productManager.getProducts(filter, options);

        // Responder con los productos
        res.json({
            status: 'success',
            payload: products,
            totalPages: Math.ceil(products.length / limit),
            page,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Controlador para obtener un producto específico por ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(id);
        if (product) {
            res.json({ status: 'success', payload: product });
        } else {
            res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export default { getProducts, getProductById };
