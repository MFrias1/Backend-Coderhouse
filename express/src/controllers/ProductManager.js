import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager{
    constructor(){
        this.path = path.join(__dirname, '..', 'models', 'product.json');

    }

    readProducts = async () => {
        let products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }

    writeProduct = async (product) => {
        let products = await fs.readFile(this.path, "utf-8")
        let productParse = JSON.parse(products)
        let productAll =  [...productParse, product]
        await fs.writeFile(this.path,JSON.stringify(productAll))
        return "producto agregado"
    }

    addProduct = async (product) => {
        const { title, description, code, price, stock, category } = product;
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Todos los campos son obligatorios');
        }
    
        let productsOlds = await this.readProducts();
    
        // Verificar si ya existe un producto con el mismo código
        if (productsOlds.some(prod => prod.code === code)) {
            throw new Error('El código del producto ya existe');
        }
        
        // Añadir el nuevo producto al final
        let productAll = [...productsOlds, product]; 
        await this.writeProduct(productAll);
    

        return 'Producto agregado';
    };

    getProducts = async () => {
        try {
            return await this.readProducts();
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }

    getProductById = async (id) => { 
        try {
            let products = await this.readProducts();
            let productById = products.find(prod => prod.id == id);
            return productById;
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            throw error;
        }
    }

}


export default ProductManager;