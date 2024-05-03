const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});
//gamers
let users = [];
let pass = [];
let numUsers = 0;


function userExists(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i] === username) {
      return true; // User exists
    }
  }
  return false; // User does not exist
}

// Socket.io events
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newUser', ({ username, password }) => {
      if (userExists(username)) { 
        io.emit('userExists', username);
      } else { 
        numUsers++;
        users.push(username);
        pass.push(password);
        console.log('User connected successfully');
        console.log(numUsers);
        console.log(users[numUsers - 1]); // Corrected index from 'numUsers' to 'numUsers - 1'
        console.log(pass[numUsers - 1]); // Corrected index from 'numUsers' to 'numUsers - 1'

      }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});