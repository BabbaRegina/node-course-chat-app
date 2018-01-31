const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {
    Users
} = require('./utils/users');
const {
    isRealString
} = require('./utils/validation');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

/*
io.emit - sends to all connected users --> io.to.emit - a tutti i loggati a quella stanza

socket.emit - sends to current connected user  --> 

socket.broadcast.emit - sends to all connected users but the initiator --> socket.broadcast.to.emit - a tutti quelli di una stanza tranne l'utente
*/

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome new user!'));

    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('input non validi');
        }

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback('');
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    });
});


server.listen(port, () => {
    console.log(`Server is up on  port ${port}`);
})