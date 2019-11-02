var express = require('express');

var app = express();

var server = app.listen(6969);

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

var CanvasData = [];

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    socket.emit('newCanvasWithData', CanvasData);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        CanvasData.push(data);
    }

}




console.log('My server is running!');