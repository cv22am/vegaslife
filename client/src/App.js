import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import Menu from './loadingMenu';

const socket = io.connect("http://localhost:3001");

function App() {
  const [screen, setScreen] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showUserExistsAlert, setShowUserExistsAlert] = useState(false);
  const [showUserNotExistsAlert, setShowUserNotExistsAlert] = useState(false);

  useEffect(() => {
    socket.on('loggedIn', () => {
      setScreen('loggedInScreen');
    });
  }, []);

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
    socket.emit("newUser", { username, password });
  
    socket.on('userExists', () => {
      setShowUserExistsAlert(true); // Set the state to show the alert
   });
  };

  const handleCurrentUser = () => {
    console.log('A user connected');
    socket.emit("currentUser", { username, password });
  
    socket.on('userNotExist', () => {
      setShowUserNotExistsAlert(true); // Set the state to show the alert
   });
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
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button onClick={handleCurrentUser}>Login</button>

            {showUserNotExistsAlert && (
              <div className="alert">
                User does not exist or password is incorrect
                <button onClick={() => setShowUserNotExistsAlert(false)}>Close</button>
              </div>
            )}

          </div>
        )}

        {screen === 'loggedInScreen' && (
          <div className="menu-container">
            <Menu />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
