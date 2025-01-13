const socket = io();

socket.emit('mensaje', 'hola, soy el cliente');

// escuchamos al evento que envia el server
socket.on('mensaje_02', (data) => {
    console.log(data);
});