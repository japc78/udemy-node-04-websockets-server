const express = require('express')
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middleWares();
    }

    middleWares() {
        // Cors
        this.app.use( cors());

        // Public path
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        })
    }
}

module.exports = Server;