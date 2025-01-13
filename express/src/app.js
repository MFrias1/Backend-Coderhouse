import express from 'express';
import productRoutes from'./routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import handlebars from 'express-handlebars';
import viewRoutes from './routes/views.routes.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 
import path from 'path'; 
import { Server } from 'socket.io'


const app = express();
const port = process.env.port || 8080;
const httpServer = app.listen(port, ()=>{
    console.log(`escuchando en puerto ${port}`)
});


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use('/hbs', viewRoutes);
    //productos.
app.use('/api/products', productRoutes);
    // carrito
app.use('/api/carts', cartRoutes);


const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
app.use('/', express.static(path.join(_dirname, 'public')));

// configuracion de HBS
app.engine('handlebars', handlebars.engine({
    layoutsDir: _dirname + '/views/layout',
    defaultLayout: 'main',
}));
app.set('views', _dirname + "/views");
app.set('view engine', 'handlebars');


//comunicacion con el socket
const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {

    //escucho a cliente
    socket.on('mensaje', data =>{
        console.log(data)
    })
    // envio mensaje al cliente
    socket.emit('mensaje', "Hola desde el server")

})

