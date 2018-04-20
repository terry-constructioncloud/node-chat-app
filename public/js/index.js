const socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


socket.on('newMessage', (message) => {
    console.log('new message', message);
    const li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});


$('#message-form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {from: 'a', text: $('[name=message]').val()}, (data) => {
            console.log('the server got it.', data);
        }
    );
});