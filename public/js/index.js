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
    li.text(`${message.from}: ${message.text}`);
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
    socket.emit('createMessage', {from: 'a', text: $('[name=message]').val()}, (data) => {
            console.log('the server got it.', data);
        }
    );
});

const locationButton = $('#send-location');
locationButton.on('click', () => {

    if (!navigator.geolocation) {
        return alert('geolocation is not supported');
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position)
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, () => {
            alert('unable to fetch location');
        })
});

