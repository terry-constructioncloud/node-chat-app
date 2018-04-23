const socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


socket.on('newMessage', (message) => {
    console.log('new message', message);
    const li = $('<li></li>');
    li.text(`${message.from} ${message.createdAt}: ${message.text}  `);
    $('#messages').append(li);
});

socket.on('newLocationMessage', message => {
    const li = $('<li></li>');
    const a = $('<a target="_blank">location</a>');
    a.attr('href', message.url);
    li.text(`${message.from}: `);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();
    const messageTextBox = $('[name=message]');
    socket.emit('createMessage', {from: 'a', text: messageTextBox.val()}, (data) => {
            messageTextBox.val('');
            console.log('the server got it.', data);
        }
    );
});

const locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('geolocation is not supported');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location..');
    navigator.geolocation.getCurrentPosition(
        position => {
            locationButton.removeAttr('disabled').text('Send Location');
            console.log(position)
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, () => {
            locationButton.removeAttr('disabled').text('Send Location');
            alert('unable to fetch location');
        })
});

