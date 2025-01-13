import ProductManager from '../managers/ProductManager.js';

const product= new ProductManager();

//enviar nuevo producto
app.post ('/products', async (req, res)=>{
    let nuevoProduct = req.body
    res.send(await product.addProducts(nuevoProduct))
})

//que traiga todos los productos
app.get('/products', async (req, res)=>{
    res.send(await product.getProduct())
})
