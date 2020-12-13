const isCheckmate = require('./chessLogic/checkmate');
const ENV = require('./env');
const { removePlayerFromLobby } = require('./socketHelpers');

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
        playersInLobby.push(usernameInput);
        username = usernameInput;
        console.log(`${username} has joined the lobby`);
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
        // TODO: removePlayersFromLobby({players, playersInLobby, io})
        removePlayerFromLobby({
          player: challenger.username,
          playersInLobby,
          io,
        });
        removePlayerFromLobby({
          player: challengee.username,
          playersInLobby,
          io,
        });
        let countdown = 6;
        const interval = setInterval(() => {
          countdown -= 1;
          if (countdown < 0) countdown = 0;
          console.log(`Game starts in ${countdown} seconds`);
          io.emit('game', {
            playerWhite: challenger.username,
            playerBlack: challengee.username,
            status: ENV.GAME_STATUS_COUNTDOWN,
            countdown,
          });
        }, 1000);
        setTimeout(() => {
          console.log('GAME_STATUS_GO');
          io.emit('game', {
            playerWhite: challenger.username,
            playerBlack: challengee.username,
            status: ENV.GAME_STATUS_GO,
          });
          clearInterval(interval);
        }, 6500);
      }
    });

    socket.on('processMove', (data) => {
      console.log(JSON.stringify(data));
      const { whosTurn, board } = data;
      socket.broadcast.emit('board', data);
      // TODO: circular dependency issues
      // let king; // whosTurn is toggled client-side
      // if (whosTurn === 'white') {
      //   king = ENV.BLACK_KING;
      // } else if (whosTurn === 'black') {
      //   king = ENV.WHITE_KING;
      // }
      // console.log(`whosTurn: ${whosTurn}, king: ${king}`);
      // if (isCheckmate({ board, king })) {
      //   console.log('CHECKMATE MOTHER FUCKER');
      // }
    });

    socket.on('disconnect', () => {
      console.log(`"${username}" lost connection`);
      removePlayerFromLobby({ player: username, playersInLobby, io });
    });
  });
};

module.exports = initSocket;
