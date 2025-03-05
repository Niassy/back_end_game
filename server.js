const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ username, roomId }) => {
        socket.join(roomId);
        io.to(roomId).emit('message', { username, message: `${username} joined the room!` });
    });

    socket.on('chatMessage', ({ username, roomId, message }) => {
        io.to(roomId).emit('message', { username, message });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
