const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://back-end-game-1.onrender.com", // Allow only your frontend to access
        methods: ["GET", "POST"]
    }
});

// Enable CORS for Express
app.use(cors({
    origin: "https://back-end-game-1.onrender.com" // Update this with your frontend URL
}));

// Serve static files from the frontend folder
app.use(express.static('front_end'));

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast message to all users
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
