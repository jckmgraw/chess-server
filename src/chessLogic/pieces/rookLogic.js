const {
  getIndexesFromPos,
  getPieceFromBoardPos,
} = require('../checkmateAssist/pieceUtil');

const rookMove = ({ board, startPos, endPos, piece }) => {
  const i = getIndexesFromPos(startPos);
  const startX = i[0];
  const startY = i[1];
  const j = getIndexesFromPos(endPos);
  const endX = j[0];
  const endY = j[1];
  const endPosPiece = getPieceFromBoardPos(board, endPos);

  // Case 1: left
  // Case 2: right
  // Case 3: up
  // Case 4: down
  // Case 5: cannot capture own piece
  if (startY !== endY && startX !== endX) {
    return { isLegal: false };
  }
  // Case 1
  if (startY === endY && startX > endX) {
    for (let x = startX - 1; x > endX; x--) {
      if (board[x][startY] !== 0) {
        return { isLegal: false };
      }
    }
  }
  // Case 2
  else if (startY === endY && startX < endX) {
    for (let x = startX + 1; x < endX; x++) {
      if (board[x][startY] !== 0) {
        return { isLegal: false };
      }
    }
  }
  // Case 3
  else if (startY < endY && startX === endX) {
    for (let y = startY + 1; y < endY; y++) {
      if (board[startX][y] !== 0) {
        return { isLegal: false };
      }
    }
  }
  // Case 4
  else if (startY > endY && startX === endX) {
    for (let y = startY - 1; y > endY; y--) {
      if (board[startX][y] !== 0) {
        return { isLegal: false };
      }
    }
  }
  // Case 5
  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return { isLegal: false };
  } else {
    return { isLegal: true };
  }
};

module.exports = rookMove;
