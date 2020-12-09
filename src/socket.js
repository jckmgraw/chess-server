const initSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('player', (data) => {
      io.emit('board', JSON.stringify({ ping: 'pong' }));
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

module.exports = initSocket;
