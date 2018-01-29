

var socket = io();

socket.on('connect', function ()  {
    console.log('Connected to server');
    
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (msg) {
    console.log(`New message from ${msg.from} at ${msg.createdAt}: ${msg.text}`);
    socket.emit('createMessage', {
        from: 'irene@gmail.com',
        text: 'nuovo messaggio di risposta dal client'
    });
})