import express from 'express';

const routerCart = express.Router();

// Crear un nuevo carrito
routerCart.post('/', (req, res) => {
    // Crear carrito vacío con id autogenerado
    res.json({
        id: new Date().getTime(),  // Ejemplo de ID autogenerado
        products: []
    });
});

// Agregar un producto al carrito
routerCart.post('/:cartid/product/:pid', (req, res) => {
    const { cartid, pid } = req.params;
    const { quantity = 1 } = req.body;  // Definir cantidad por defecto

    // Aquí se debería agregar la lógica para agregar productos al carrito
    res.json({
        cartid,
        product: pid,
        quantity
    });
});

// Listar productos del carrito
routerCart.get('/:cartid', (req, res) => {
    const { cartid } = req.params;

    // Aquí se debería devolver la lista de productos del carrito
    res.json({
        cartid,
        products: []  // Este es un ejemplo vacío
    });
});

export default routerCart;
