const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const users = new Users();
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        socket.emit('newMessage', generateMessage('admin', 'welcome'));
        io.to(params.room).emit('updateList', users.getUserList(params.room));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined`));
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
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left`));
        }
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log(`app is running on ${port}`);
});
