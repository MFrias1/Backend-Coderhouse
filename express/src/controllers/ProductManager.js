import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '..', 'models', 'product.json');
    }

    // Leer productos desde el archivo
    readProducts = async () => {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }

    // Escribir productos en el archivo
    writeProduct = async (products) => {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    // Agregar un nuevo producto
    addProduct = async (product) => {
        const { title, description, code, price, stock, category } = product;
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Todos los campos son obligatorios');
        }

        const products = await this.readProducts();
        
        // Verificar si el producto ya existe por código
        if (products.some(prod => prod.code === code)) {
            throw new Error('El código del producto ya existe');
        }

        products.push(product); 
        await this.writeProduct(products);
        return 'Producto agregado';
    };

    // Obtener todos los productos
    getProducts = async () => {
        return await this.readProducts();
    }

    // Obtener un producto por ID
    getProductById = async (id) => {
        const products = await this.readProducts();
        return products.find(prod => prod.id == id);
    }
}

export default ProductManager;
