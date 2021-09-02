const express = require('express');
const app = express();


const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);

    socket.broadcast.emit('user-connected', { msg: "Se conecto un usuario", id: socket.id })

    socket.emit('welcome', { msg: 'Bienvenido al servidor WebSocket' })
        //Escuchando evento chat-message
    socket.on('chat-message', (msg) => {
        socket.broadcast.emit('chat-message', msg);
    });


    socket.on('disconnect', () => {
        //AQUI DEBO EMITIR LA DESCONEXION
        //EL CLIENTE DEBERIA ESTAR ESCUCHANDO
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});