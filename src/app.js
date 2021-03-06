require('dotenv').config();
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const initSocket = require('./socket');

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static(path.join(__dirname, '../build')))
  .use((req, res) =>
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  )
  .get('/', function (req, res) {
    console.log('.get()');
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

initSocket({ io, isDev: false });
