const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        //Http server
        this.server = http.createServer(this.app);

        //Configurar sockets
        this.io = socketio(this.server);

    }

    middlewares(){
        //directorio estatico
        this.app.use(express.static(path.resolve(__dirname,'../public')));

        //CORS
        this.app.use(cors());
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){
        //Iniciaizar los middlewares
        this.middlewares();

        //Inicializar los sockets
        this.configurarSockets();

        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log('listening on *:'+this.port);
        });
    }

}

module.exports = Server;