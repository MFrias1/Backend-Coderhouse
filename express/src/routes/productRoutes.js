import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Ruta para obtener todos los productos con filtros y paginación
router.get('/', productController.getProducts);

// Ruta para obtener un producto específico por ID
router.get('/:id', productController.getProductById);

// Ruta para crear un nuevo producto (requiere autenticación)
router.post('/', productController.create);

// Ruta para actualizar un producto
router.put('/:id', productController.update);

// Ruta para eliminar un producto (requiere autenticación)
router.delete('/:id', productController.remove);


export default router;
