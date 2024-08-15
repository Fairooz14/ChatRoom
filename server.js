
const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

let users = [];

// Handle new socket connections
io.on("connection", function(socket){
    // Handle a new user joining
    socket.on("newuser", function(username){
        users.push(username);
        // console.log(users + "joined");
        // Notify other users that a new user has joined
        socket.broadcast.emit("update", username + " joined");
        // Send the updated user list to all clients
        io.emit("userList", users);
    });

    // Handle a user leaving
    socket.on("exituser", function(username){
        users = users.filter(user => user !== username);
        // console.log(users + "left");
        // Notify other users that a user has left
        socket.broadcast.emit("update", username + " left");
        // Send the updated user list to all clients
        io.emit("userList", users);
    });

    // Handle incoming chat messages
    socket.on("chat", function(message){
        // Broadcast the message to all other users
        socket.broadcast.emit("chat", message);
    });
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});


