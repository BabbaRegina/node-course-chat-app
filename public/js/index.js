
var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function (msg) {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${msg.from} : ${msg.text}`);
    jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>'); //_blank per aprire un nuovo tab
    li.text(`${formattedTime} ${message.from} : `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {

    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        // clear value after sending message
        messageTextbox.val('');
    });

})

// gestione bottone location
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocalizzazione non supportata dal browser');
    }
    //dopo averlo cliccato viene disabilitato
    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        //abilito di nuovo il bottone
        locationButton.removeAttr('disabled').text('Send Location');
    }, function (err) {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send Location');
    })

});