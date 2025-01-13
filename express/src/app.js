import express from 'express';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import viewRoutes from './routes/views.routes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path'; 
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import path from 'path';

// Conexión a MongoDB
async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/miPrimeBase");
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1);
  }
}

startServer();

const app = express();
const port = process.env.PORT || 8080;
const httpServer = app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/hbs', viewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Configuración de archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Comunicación con el Socket
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  console.log('Nuevo cliente conectado');

  // Escucho mensaje del cliente
  socket.on('mensaje', data => {
    console.log(data);
  });

  // Envío mensaje al cliente
  socket.emit('mensaje', "Hola desde el servidor");
});
