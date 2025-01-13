import Product from '../models/Product.js';

class ProductManager {

    // Agregar un nuevo producto
    addProduct = async (product) => {
        const { title, description, code, price, stock, category } = product;

        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Verificar si el producto ya existe por código
        const existingProduct = await Product.findOne({ code });
        if (existingProduct) {
            throw new Error('El código del producto ya existe');
        }

        // Crear un nuevo producto en la base de datos
        const newProduct = new Product(product);
        await newProduct.save();
        return 'Producto agregado';
    };

    // Obtener todos los productos
    getProducts = async (filter = {}, options = {}) => {
        try {
            const products = await Product.find(filter, null, options); // Obtiene productos con paginación y filtros
            return products;
        } catch (error) {
            throw new Error('Error al obtener productos: ' + error.message);
        }
    };

    // Obtener un producto por ID
    getProductById = async (id) => {
        try {
            const product = await Product.findById(id);
            return product;
        } catch (error) {
            throw new Error('Producto no encontrado');
        }
    };
}

export default ProductManager;
