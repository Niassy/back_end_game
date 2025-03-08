const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://back-end-game-1.onrender.com", // Allow only your frontend
        methods: ["GET", "POST"]
    }
});

// Enable CORS for Express
app.use(cors({
    origin: "https://back-end-game-1.onrender.com"
}));

// Serve static files from the frontend folder
app.use(express.static('front_end'));

// Store connected users
let users = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle new user joining
    socket.on('set username', (username) => {
        users[socket.id] = username;
        io.emit('user joined', `${username} has joined the chat`);
    });

    // Handle incoming chat messages
    socket.on('chat message', (msg) => {
        const username = users[socket.id] || "Anonymous";
        io.emit('chat message', { username, message: msg });
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            io.emit('user left', `${username} has left the chat`);
            delete users[socket.id]; // Remove user from list
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
