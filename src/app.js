require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const helmet = require('helmet');
const initSocket = require('./socket');

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3069;
const INDEX = '/index.html';

const server = express()
  // .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server, {
  origins: ['http://localhost:3000'],
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      // 'Access-Control-Allow-Credentials': true,
    });
    res.end();
  },
});
// io.set('origins', 'http://localhost:3000');

initSocket(io);

// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(helmet());

// https://enable-cors.org/server_expressjs.html
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'localhost');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// app.use((error, req, res, next) => {
//   console.log(`[ERROR]: ${error.stack}`);
//   return res.status(500).json({
//     status: 500,
//     error: error.toString(),
//     message: 'See console logs for error.stack',
//   });
// });

// if (process.env.NODE_ENV === 'development') {
// }
// http.listen(port, () => {
//   console.log(`listening on: ${port}`);
// });

// module.exports = app;
