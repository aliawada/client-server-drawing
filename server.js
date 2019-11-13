var express = require('express');

var app = express();

var server = app.listen(6969);

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

var clients = [];
var CanvasData = [];

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    // chat
    socket.on("join", function (name) {
        console.log("Joined: " + name);
        clients[socket.id] = name;
        socket.emit("update", "You have connected to the server.");
        socket.broadcast.emit("update", name + " has joined the server.")
    });

    socket.on("send", function (msg) {
        console.log("Message: " + msg);
        socket.broadcast.emit("chat", clients[socket.id], msg);
    });

    socket.on("disconnect", function () {
        console.log("Disconnect");
        io.emit("update", clients[socket.id] + " has left the server.");
        delete clients[socket.id];
    });
    //chat

    //canvas
    socket.emit('newCanvasWithData', CanvasData);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        CanvasData.push(data);
    }
    //canvas
}




console.log('My server is running!');