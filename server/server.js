const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const fs = require('fs');



app.use(cors());

const server = http.createServer(app);
const userDataFilePath = 'userdata.json';


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


const cash = 5000;
let numUsers = 0;


let userData = loadUserData();

function loadUserData() {
  try {
    // Read user data from file
    const data = fs.readFileSync(userDataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveUserData() {
  // Write user data to file
  const userDataString = userData.map(user => JSON.stringify(user)).join(',\n') + '\n';
  const jsonContent = `[${userDataString}]`;
  fs.writeFileSync(userDataFilePath, jsonContent, 'utf8');
}

function userExists(username) {
  return userData.some(user => user.username === username);
}

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newUser', ({ username, password }) => {
      if (userExists(username)) { 
        io.emit('userExists', username);
      } else { 
        numUsers++;
        userData.push({ username, password, cash });
        saveUserData(); 
        console.log('User connected successfully');
        console.log(numUsers);
        console.log('User connected successfully');
        console.log(userData);
        io.emit('loggedIn', { userData: userData });

      }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

