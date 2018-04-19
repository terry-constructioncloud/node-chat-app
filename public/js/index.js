const socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createMessage', {foo: 'bar'});
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


socket.on('newMessage', (data) => {
    console.log('new message', data);
});

