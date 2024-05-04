import React, { useState, useEffect } from 'react';
import './Menu.css';
import { quotes } from './StaticArrays/qoutes.js';
import { images } from './StaticArrays/images.js';

function Menu({ socket, username }) {
  const [currentPage, setCurrentPage] = useState('leaderboard');
  const [randomQuote] = useState(getRandomItem(quotes));
  const [randomImage] = useState(getRandomItem(images));
  const [cash, setCash] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [cashValues, setCashValues] = useState([]);

  useEffect(() => {
    userInfo(); // Call userInfo when the component mounts
  
    socket.on('returnInfo', ({ cash }) => {
      setCash(cash);
    });
  
    socket.on('leaderboardData', ({ usernames, cashValues }) => {
      console.log("Leaderboard Data Received:", usernames, cashValues);
      setUsernames(usernames);
      setCashValues(cashValues);
    });
  }, []); // Empty dependency array to run only once when mounted
   // Empty dependency array to run only once when mounted

  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const userInfo = () => {
    if (socket) {
      socket.emit("userInfo", { username });
      socket.emit("leaderboard"); // Corrected event name
    }
  };
  

  return (
    <div>
      <nav>
        <ul>
          <li><button onClick={() => handleNavigation('leaderboard')}>Leaderboard</button></li>
          <li><button onClick={() => handleNavigation('about')}>Games</button></li>
          <li><button onClick={() => handleNavigation('contact')}>Help</button></li>
        </ul>
      </nav>
      <div className="persistent-section">
      <h2>Image of the day:</h2>
        <img src={randomImage} alt="Random Image" />
        <h2>Quote of the day:</h2>
        <p>{randomQuote}</p>
        <h2>Profile</h2>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Cash:</strong> {cash}</p>
        <p><strong>Leaderboard Standing:</strong> tbd</p>
        <p><strong>Number of games played:</strong> tbd</p>
      </div>
      <div className="content-section">
        {currentPage === 'leaderboard' && <Leaderboard usernames={usernames} cashValues={cashValues} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </div>
    </div>
  );
}

function Leaderboard({ usernames, cashValues }) {
  console.log("Usernames:", usernames); // Check if usernames is received
  console.log("Cash Values:", cashValues); // Check if cashValues is received

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Cash</th>
          </tr>
        </thead>
        <tbody>
          {usernames && cashValues && usernames.map((username, index) => (
            <tr key={index}>
              <td>{username}</td>
              <td>{cashValues[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

export default Menu;
