const socket = io();

const lbOn  = document.querySelector('#lb-online');
const lbOff = document.querySelector('#lb-offline');
const btnSend = document.querySelector('#btnSend');
const txtMessage = document.querySelector('#txtMessage');

// Eventos o Observables del cliente
socket.on('connect', ()=> {
    lbOn.style.display = 'inline';
    lbOff.style.display = 'none';
});

socket.on('disconnect', ()=> {
    lbOn.style.display = 'none';
    lbOff.style.display = 'inline';
})

// Evento personalizado
socket.on('channel-test', (payload)=> {
    console.log(payload);
})

btnSend.addEventListener('click', () => {
    const msg = txtMessage.value;

    payload = {
        msg,
        id: 'id_testing',
        email: 'japc.testing@gmail.com',
        date: new Date().getTime()
    }

    // Evento de emitir mensaje personalizado
    socket.emit('channel-test', payload);
})