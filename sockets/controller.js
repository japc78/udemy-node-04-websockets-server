const socketController = (socket)  => {
    console.log('Client connected', socket.id);

    socket.on('disconnect', ()=> {
        console.log('Client disconnected', socket.id);
    })

    socket.on('channel-test', ( payload, callback ) => {
        // console.log('Send message from server');
        console.log(payload);

        // Enviar mensajes a todos los clientes
        // this.io.emit('channel-test', 'From Server')
        // Solo envía un mensaje al cliente que lo envía
        // socket.emit('channel-test', payload);
        // broadcast para enviar el mensaje a todos los clientes
        socket.broadcast.emit('channel-test', payload);

        // Callback que se puede enviar de manera opcional al cliente que enviá el mensaje
        const id = 123456;
        callback(id);
    })
}

module.exports = {
    socketController
}