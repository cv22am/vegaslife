import React, { useState } from 'react';

function Menu() {
  // Array of 100 inspiring gambling quotes
  const quotes = [
    "The best throw of the dice is to throw them away.",
    "The only way to win at gambling is to wear a fake mustache.",
    "Gambling is like oxygen: it's not a big deal until you can't get enough of it.",
    "The best way to double your money is to fold it in half and put it back in your pocket.",
    "If you ain't just a little scared when you enter a casino, you ain't alive.",
    "The difference between gambling and investing is that with gambling, the odds are always against you.",
    "I'm not addicted to gambling, I'm just in a committed relationship with uncertainty.",
    "The best strategy in gambling is to bet on your own stupidity. The odds are always in your favor.",
    "I don't have a gambling problem, I have a problem with losing.",
    "In gambling, the only sure thing is that the house always wins. That's why I built my own house.",
    "I used to be a heavy gambler, but now I just bet on my own incompetence.",
    "The best bet in gambling is to bet against yourself. That way, you're always a winner.",
    "The secret to winning at gambling is simple: don't play.",
    "Gambling is like a roller coaster: it's thrilling, terrifying, and ultimately leaves you broke.",
    "If at first you don't succeed in gambling, try, try again until you run out of money.",
    "The only thing worse than losing at gambling is winning and realizing it's not enough.",
    "You know you're a gambling addict when your dreams are sponsored by the nearest casino.",
    "The best way to avoid losing at gambling is to avoid gambling altogether.",
    "The only sure thing in gambling is that the odds are never in your favor.",
    "I don't have a gambling problem, I have a problem with reality.",
    "The only difference between a gambler and a magician is that the magician knows when to disappear.",
    "If life is a gamble, then every day is a roll of the dice.",
    "The odds of winning at gambling are about as likely as finding a needle in a haystack. With a blindfold on.",
    "I don't have a gambling problem, I have a problem with math.",
    "Gambling is like love: it's all fun and games until someone gets hurt. Usually, it's your wallet.",
    "The best way to win at gambling is to convince yourself you're already a winner. It's all about mindset.",
    "If you want to make a million dollars gambling, start with two million.",
    "The only thing worse than losing at gambling is winning and realizing you're still broke.",
    "I don't have a gambling problem, I have a problem with self-control.",
    "The best part about gambling is that you never know what's going to happen next. The worst part? You never know what's going to happen next."
  ];
  

  let set_quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="menu">
      <header className="menu-header">
        <div>
          <h1>{set_quote}</h1>
          <img src="https://davidmcelroy.org/wp-content/uploads/2012/01/Three-feet-from-gold.jpg" alt="Inspiring image"/>
        </div>
      </header>
    </div>
  );
}

export default Menu;
