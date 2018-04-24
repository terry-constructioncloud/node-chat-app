const scrollToBottom = () => {
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child');
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

const socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


socket.on('newMessage', (message) => {
    const template = $('#message-template').html();
    const html = Mustache.render(template, {message});
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', message => {
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {message});
    $('#messages').append(html);
    scrollToBottom();
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

