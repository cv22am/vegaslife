import React, { useState, useEffect } from 'react';
import './Menu.css';

function Menu({ socket, username }) {
  const quotes = [
    "The best throw of the dice is to throw them away.",
    "The only way to win at gambling is to wear a fake mustache.",
    // Add more quotes...
  ];

  const images = [
    "https://davidmcelroy.org/wp-content/uploads/2012/01/Three-feet-from-gold.jpg",
    "https://www.shutterstock.com/image-photo/french-bulldogs-playing-cards-260nw-1141633661.jpg",
    // Add more images...
  ];

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
          <li><button onClick={() => handleNavigation('leaderboard')}>leaderboard</button></li>
          <li><button onClick={() => handleNavigation('about')}>About</button></li>
          <li><button onClick={() => handleNavigation('contact')}>Contact</button></li>
        </ul>
      </nav>
      <div className="persistent-section">
        <img src={randomImage} alt="Random Image" />
        <p>{randomQuote}</p>
        <p>Username: {username}</p>
        <p>Cash: {cash}</p>
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
