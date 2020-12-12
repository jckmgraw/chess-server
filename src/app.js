require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const initSocket = require('./socket');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.SERVER_PORT || '5069';
app.set('port', port);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

// https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'localhost');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use((error, req, res, next) => {
  console.log(`[ERROR]: ${error.stack}`);
  return res.status(500).json({
    status: 500,
    error: error.toString(),
    message: 'See console logs for error.stack',
  });
});

initSocket(io);

if (process.env.NODE_ENV === 'development') {
  http.listen(port, () => {
    console.log(`listening on: ${port}`);
  });
}

module.exports = app;
