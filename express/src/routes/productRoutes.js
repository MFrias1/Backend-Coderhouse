import * as productController from '../controllers/productController.js';
import express from "express";

const router = express.Router();

// Ruta para obtener todos los productos con paginación, filtro y orden
router.get('/', productController.getProducts);

// Ruta para obtener un producto por su ID
router.get('/:id', productController.getById);

// Ruta para crear un nuevo producto (requiere autenticación)
router.post('/', productController.create);

// Ruta para actualizar un producto
router.put('/:id', productController.update);

// Ruta para eliminar un producto (requiere autenticación)
router.delete('/:id', productController.remove);

export default router;
