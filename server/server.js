const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', {from: 'admin', text: 'welcome', createdAt: Date.now()});
    socket.broadcast.emit('newMessage', {from: 'admin', text: 'new user joined', createdAt: Date.now()});
    socket.on('createMessage', ({from, text}) => {
        console.log(from, text);
        // io.emit('newMessage', {
        //     from, text, createAt: Date.now()
        // });

        // socket.broadcast.emit('newMessage', {
        //     from, text, createAt: Date.now()
        // });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log(`app is running on ${port}`);
});
