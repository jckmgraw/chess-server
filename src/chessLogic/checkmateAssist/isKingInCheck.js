const { getPosFromIndexes } = require('./pieceUtil');
const { isSquareThreatened } = require('./isSquareThreatened');

const isKingInCheck = ({ board, king }) => {
  console.log(board);
  console.log(`king: ${king}`);
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (board[x][y] === king) {
        const pos = getPosFromIndexes([x, y]);
        console.log(`pos: ${pos}`);
        if (
          isSquareThreatened({
            board,
            pos,
            piece: king,
            isCapturing: false,
            isCalledFromIsKingInCheck: true,
          })
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

module.exports = isKingInCheck;
