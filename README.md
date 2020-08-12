# Console-Poker

## Description

Some time ago, I wanted to set up a simple online cash poker game with my friends. My poker background: I never really played online poker before and occassionally play poker when my friends and I hung out with little amounts of cash. 

I decided to try to find a website where we can easily set up a game and begin playing with real money, but it was such a hassle. Many online poker sites require you to download clients to play a simple poker game. Also, there are so many different types of poker to choose from i.e. "Omaha", Stud", and "Razz" that I don't care for. And on top of that, the UI's for these websites look so busy and complicated.

I just wanted a simple easy-to-use application where I can quickly play Texas hold'em for cash.

No download, simple client dedicated for ONLY Texas Hold'em, and quick USD transactions.

That was how I decided to make this application, Console-Poker. Console-poker is an online Poker application that supports real-time chatting and USD transactions!

Built using React.js. Stylesheet used [Nes.css](https://nostalgic-css.github.io/NES.css/)

[Deployed Website](https://console-poker.herokuapp.com/)

[API back end](https://github.com/arthurysong/console-poker-api)

## Application Status

Currently, the application is still being built out. The Stripe API is not accepting real USD transactions and only accepting test data. 

### To do: 
- Support split-pots (currently, when someone goes all-in, no more bets are accepted for the round)
- Keep data on a users' wins and rounds played
- Using player data on winnings, compute 'leaderboards' for a 'season'

## Features
- Real-time chatting
- Create Rooms with passwords to keep your group's room private

## Usage
- Sign in or Register a new Account (Test user: sona@gmail.com, 123456)
- Deposit Funds at the "Bank" page (Test card: 4242 4242 4242 4242, Any future exp. date, any zipcode, any CVV)
- Join a room, or create a new room (Test room: Marley's room, Marley will always call or check)
- Play No-Limit Texas Holdem
- Once you're done playing, head back to the bank and withdraw your winnings!

## Development

- Fork the repository and Clone into local machine
- Navigate to the local dir
- Install the packages: `npm install`
- Start the react server: `npm start`

## Inspirations
- [Poker Now](https://www.pokernow.club/) Poker Now is a great website, where you can easily set up Hold'em games with your friends. Poker now features Sit and Go tournaments, and also many other cool features using Discord bots including USD wallets.