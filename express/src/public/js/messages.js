/*const socket = io();
let user;

const chatBox = document.getElementById('chatBox');

Swal.fire({
    title: "Identificate",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    confirmButtonText: "confirmar",
    inputValidator:(value)=>{
        if(!value){
            return 'ingresa tu nombre'
        }
    },
    allowOutsideClick : false
}).then(result =>{
    user = result.value

    const nombre = document.getElementById('nombre')
    nombre.innerHTML = user
});

//guardado de mensajes del user
chatBox.addEventListener('keyup', evento=>{
    if(evento.key === 'Enter'){
        socket.emit('message',{
            user: user, 
            message: chatBox.value
        })
        chatBox.value = '';
    } else if(evento.key === 'Enter') {
        // Si no hay texto, muestra una alerta
        Swal.fire({
            icon: 'warning',
            title: 'Ingresa un mensaje'
        });
    }
})*/