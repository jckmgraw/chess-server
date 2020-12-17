require('dotenv').config();
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const initSocket = require('./socket');

const PORT = process.env.PORT || 3000;

const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

const io = socketIO(server);

initSocket(io);
