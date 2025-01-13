import express from 'express';

const routerCart = express.Router();


routerCart.post('/', (req, res) => {
    res.json({
        id: new Date().getTime(),  
        products: []
    });
});


routerCart.post('/:cartid/product/:pid', (req, res) => {
    const { cartid, pid } = req.params;
    const { quantity = 1 } = req.body;  

    res.json({
        cartid,
        product: pid,
        quantity
    });
});


routerCart.get('/:cartid', (req, res) => {
    const { cartid } = req.params;

    res.json({
        cartid,
        products: []  
    });
});

export default routerCart;
