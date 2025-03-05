const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS) from the "front_end" directory
app.use(express.static('front_end'));

// Setup socket connection
io.on('connection', (socket) => {
    console.log('a user connected');
    
    // Handle incoming messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

const cors = require('cors');
app.use(cors());
