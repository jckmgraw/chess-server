// TODO
const removePlayersFromLobby = ({ players, playersInLobby, io }) => {
  for (let i = 0; i < playersInLobby.length; i++) {
    if (playersInLobby[i] === players) {
      playersInLobby.splice(i, 1);
      break;
    }
  }
  io.emit('setPlayersInLobby', playersInLobby);
};

const removePlayerFromLobby = ({ player, playersInLobby, io }) => {
  console.log(`user "${player}" disconnected`);
  for (let i = 0; i < playersInLobby.length; i++) {
    if (playersInLobby[i] === player) {
      playersInLobby.splice(i, 1);
      break;
    }
  }
  io.emit('setPlayersInLobby', playersInLobby);
};

module.exports = { removePlayersFromLobby, removePlayerFromLobby };
