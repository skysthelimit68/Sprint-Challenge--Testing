const express = require('express');

const server = express();

const gamesRouter = require('../games/gamesRouter.js');


server.use(express.json());


server.use('/api/games', gamesRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'working' });
  });

module.exports = server;
