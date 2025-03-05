//const socket = io();

const socket = io("https://back-end-game.onrender.com/"); // Replace with the backend URL from Render

let username = prompt("Enter your username:");
let roomId = prompt("Enter room ID:") || "room123"; // Default room if not specified

socket.emit('joinRoom', { username, roomId });

class ChatScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ChatScene' });
    }

    create() {
        this.add.text(20, 20, `Room: ${roomId}`, { fontSize: '24px', fill: '#fff' });

        this.chatMessages = this.add.text(20, 60, '', { fontSize: '20px', fill: '#fff', wordWrap: { width: 760 } });

        // Get input elements from the DOM
        this.messageInput = document.getElementById("messageInput");
        this.sendButton = document.getElementById("sendButton");

        this.sendButton.addEventListener("click", () => this.sendMessage());
        this.messageInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") this.sendMessage();
        });

        socket.on('message', (data) => {
            this.chatMessages.text += `\n${data.username}: ${data.message}`;
        });
    }

    sendMessage() {
        const message = this.messageInput.value;
        if (message.trim() !== "") {
            socket.emit('chatMessage', { username, roomId, message });
            this.messageInput.value = ""; // Clear input field
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: ChatScene
};

new Phaser.Game(config);
