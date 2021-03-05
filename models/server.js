const express = require('express')
const cors = require('cors');
const io = require('socket.io');
const http = require('http');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = io(this.server);

        this.middleWares();

        this.socketsEvents();
    }

    middleWares() {
        // Cors
        this.app.use( cors());

        // Public path
        this.app.use(express.static('public'));
    }

    socketsEvents(){
        this.io.on('connection', socket  => {
            console.log('Client connected', socket.id);

            socket.on('disconnect', ()=> {
                console.log('Client disconnected', socket.id);
            })

            socket.on('channel-test', ( payload, callback ) => {
                // console.log('Send message from server');
                console.log(payload);

                // Enviar mensajes a todos los clientes
                // this.io.emit('channel-test', 'From Server')
                this.io.emit('channel-test', payload);

                // Callback que se puede enviar de manera opcional al cliente que enviá el mensaje
                const id = 123456;
                callback(id);
            })
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        })
    }
}

module.exports = Server;