
var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (msg) {
    console.log(`New message from ${msg.from} at ${msg.createdAt}: ${msg.text}`);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    jQuery('#messages').append(li);
})

// socket.emit('createMessage', {from: 'Frank', text:'hello there!'}, function(data) {
//     console.log('got it!', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
})

// gestione bottone location
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocalizzazione non supportata dal browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (err) {
        alert('Unable to fetch location');
    })

});