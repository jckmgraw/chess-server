const ENV = require('./env');

const board = [];
const playersInLobby = [];
const games = [];

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected');
    let username = '';

    socket.on('addPlayerToLobby', (data) => {
      const { usernameInput, id } = data;
      if (playersInLobby.includes(usernameInput)) {
        console.log('addPlayerToLobbyResponse, playerExists');
        io.emit('addPlayerToLobbyResponse', {
          username: usernameInput,
          id,
          message: 'playerExists',
        });
      } else {
        console.log('addPlayerToLobbyResponse, success');
        playersInLobby.push(usernameInput);
        username = usernameInput;
        io.emit('addPlayerToLobbyResponse', {
          username,
          id,
          message: 'success',
          playersInLobby,
        });
      }
    });

    socket.on('challenge', (data) => {
      const { challenger, challengee } = data;
      console.log(JSON.stringify(data));
      socket.broadcast.emit('challenge', { challenger, challengee });
      if (
        challenger.status === ENV.CHALLENGE_STATUS_ACCEPTED &&
        challengee.status === ENV.CHALLENGE_STATUS_ACCEPTED
      ) {
        console.log('TODO: set interval and start game in X seconds');
      }
    });

    socket.on('processMove', (data) => {
      console.log(JSON.stringify(data));
      io.emit('board', data);
    });

    socket.on('disconnect', () => {
      console.log(`user "${username}" disconnected`);
      for (let i = 0; i < playersInLobby.length; i++) {
        if (playersInLobby[i] === username) {
          playersInLobby.splice(i, 1);
          break;
        }
      }
      io.emit('setPlayersInLobby', playersInLobby);
    });
  });
};

module.exports = initSocket;
