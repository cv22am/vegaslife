import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [screen, setScreen] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showUserExistsAlert, setShowUserExistsAlert] = useState(false); // State to control alert visibility

  socket.on('userExists', (existingUsername) => {
    console.log(`User '${existingUsername}' already exists!`);
    setShowUserExistsAlert(true); // Set state to display the alert
  });

  const handleNewUserClick = () => {
    setScreen('newUser');
  };

  const handleCurrentUserClick = () => {
    setScreen('currentUser');
  };

  const handleBackClick = () => {
    setScreen(null);
  };

  const handleNewUser = () => {
    console.log('A user connected');
    // Emit username and password when login button is pressed
    socket.emit("newUser", { username, password });
  };

  return (
    <div className="App">
      <header className="App-header">
        {screen === null && (
          <div>
            <button onClick={handleNewUserClick}>New User</button>
            <button onClick={handleCurrentUserClick}>Current User</button>
          </div>
        )}
        {screen === 'newUser' && (
          <div>
            <h2>Login In</h2>
            <button onClick={handleBackClick}>Back</button>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button onClick={handleNewUser}>Login</button>
            
            {/* Display alert if user exists */}
            {showUserExistsAlert && (
              <div className="alert">
                User already exists!
                <button onClick={() => setShowUserExistsAlert(false)}>Close</button>
              </div>
            )}
          </div>
        )}
        {screen === 'currentUser' && (
          <div>
            <h2>Gamers</h2>
            <button onClick={handleBackClick}>Back</button>

            <input
              type="text"
              placeholder="Username"
              onChange={(event) => {
                // Handle input change for new user (if needed)
              }}
            />
//gamers
            <input
              type="text"
              placeholder="Password"
              onChange={(event) => {
                // Handle input change for new pass (if needed)
              }}
            />

            {/* Add logic for registering a new user (if needed) */}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
