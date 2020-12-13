const { getIndexesFromPos, getPosFromIndexes } = require('./pieceUtil');
const isMoveLegal = require('./isMoveLegal');

const isSquaresThreatened = ({ board, positions, piece }) => {
  for (let i = 0; i < positions.length - 1; i++) {
    if (isSquareThreatened({ board, pos: positions[i], piece })) {
      return true;
    }
  }
  return false;
};

const isSquareThreatened = ({
  board,
  pos,
  piece,
  isCapturing = true,
  isCalledFromIsKingInCheck = false,
}) => {
  const indexes = getIndexesFromPos(pos);
  const squareX = indexes[0];
  const squareY = indexes[1];
  let boardCopy = JSON.parse(JSON.stringify(board));
  console.log(`isCapturing: ${isCapturing}`);
  if (isCapturing) {
    console.log('isCapturing entered');
    boardCopy[squareX][squareY] = 0;
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const startPos = getPosFromIndexes([x, y]);
      if (piece > 0 && board[x][y] < 0) {
        const { isLegal } = isMoveLegal({
          board: boardCopy,
          startPos,
          endPos: pos,
          isCheckingForSquareThreatened: true,
          isCalledFromIsKingInCheck,
        });
        if (isLegal) {
          return true;
        }
      } else if (piece < 0 && board[x][y] > 0) {
        const { isLegal } = isMoveLegal({
          board: boardCopy,
          startPos,
          endPos: pos,
          isCheckingForSquareThreatened: true,
          isCalledFromIsKingInCheck,
        });
        if (isLegal) {
          return true;
        }
      }
    }
  }
  return false;
};

module.exports = {
  isSquareThreatened,
  isSquaresThreatened,
};
