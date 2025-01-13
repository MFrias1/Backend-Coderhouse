import { Router } from 'express';
import express from 'express';
import ProductManager from '../controllers/ProductManager';

const product = new ProductManager()

const app = express();

app.use(express.json())

//Ruta para listar todos los productos (API)
app.get('/products', async (req, res) => {
    try {
        const products = await product.getProducts();
        res.json(products);  // Retorna los productos como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});


//Ruta para obtener un producto por id (API)
app.get('/api/product/:id', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});

// Ruta para agregar un nuevo producto 
app.post('/product', async (req, res) => {
    let newProduct = req.body
    res.send(await product.writeProduct(newProduct))
    
});

// Ruta para actualizar un producto por id (API)
app.put('/:productid', async (req, res) => {
    const { productid } = req.params;
    const updatedFields = req.body;
    try {
        let product = await productManager.getProductById(productid);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        product = { ...product, ...updatedFields };  // Actualiza solo los campos recibidos
        await productManager.writeProduct(await productManager.getProducts()); // Guarda los productos actualizados
        res.status(200).json({ message: 'Producto actualizado', product });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
});

// Ruta para eliminar un producto por id (API)
app.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const products = await productManager.getProducts();
        const productIndex = products.findIndex(product => product.id == pid);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        products.splice(productIndex, 1); // Elimina el producto del array
        await productManager.writeProduct(products); // Actualiza el archivo con el nuevo array
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
});

export default app;
