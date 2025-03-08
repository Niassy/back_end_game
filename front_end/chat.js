const socket = io("https://back-end-game.onrender.com"); // Use your backend URL

// Ask for the username
const username = prompt("Enter your username:");
socket.emit('set username', username);

// Handle form submission for chat messages
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('message-input');
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = ''; // Clear input after sending
    }
});

// Display messages
socket.on('chat message', (data) => {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('li');
    messageElement.textContent = `${data.username}: ${data.message}`;
    messages.appendChild(messageElement);
});

// Show when a user joins
socket.on('user joined', (msg) => {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('li');
    messageElement.textContent = msg;
    messageElement.style.color = "green"; // Highlight join messages
    messages.appendChild(messageElement);
});

// Show when a user leaves
socket.on('user left', (msg) => {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('li');
    messageElement.textContent = msg;
    messageElement.style.color = "red"; // Highlight leave messages
    messages.appendChild(messageElement);
});
