
var socket = io();

socket.on('connect', function ()  {
    console.log('Connected to server');
    
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (msg) {
    console.log(`New message from ${msg.from} at ${msg.createdAt}: ${msg.text}`);
    
})

socket.emit('createMessage', {from: 'Frank', text:'hello there!'}, function(data) {
    console.log('got it!', data);
});