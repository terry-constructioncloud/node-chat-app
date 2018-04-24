const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', generateMessage('admin', 'welcome'));
    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.');
        }
        callback();
    });

    socket.on('createMessage', ({from, text}, callback) => {
        console.log(from, text);
        io.emit('newMessage', generateMessage(from, text));
        // the callback function here is the acknowledgement
        callback('here is the acknowledgement from the server');
        // socket.broadcast.emit('newMessage', {
        //     from, text, createAt: Date.now()
        // });
    });

    socket.on('createLocationMessage', ({latitude, longitude}) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', latitude, longitude));
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log(`app is running on ${port}`);
});
