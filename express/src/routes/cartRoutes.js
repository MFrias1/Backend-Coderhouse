import express from 'express';

const routerCart = express.Router();

routerCart.post('/', (req, res) => {
    res.render('index', {
        /*Debe crear un nuevo carrito con la siguiente estructura:
        id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).
        products: Array que contendrá objetos que representen cada producto.*/
    })
});

routerCart.post('/:cartid/product/:pid', (req, res) => {
    res.render('index', {
        /*Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:
        product: Solo debe contener el ID del producto.

        quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).


        Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto */
    })
});

routerCart.get('/:cartid', (req, res) => {
    res.render('index', {
        /*.Debe listar los productos que pertenecen al carrito con el cid proporcionado*/
    })
});
export default routerCart;

