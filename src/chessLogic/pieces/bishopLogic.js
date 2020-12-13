const {
  getIndexesFromPos,
  getPieceFromBoardPos,
} = require('../checkmateAssist/pieceUtil');

const bishopMove = ({ board, startPos, endPos, piece }) => {
  const i = getIndexesFromPos(startPos);
  const startX = i[0];
  const startY = i[1];
  const j = getIndexesFromPos(endPos);
  const endX = j[0];
  const endY = j[1];
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  const xDist = Math.abs(startX - endX);
  const yDist = Math.abs(startY - endY);

  // Case 1: up/left diagonal
  // Case 2: up/right diagonal
  // Case 3: down/left diagonal
  // Case 4: down/right diagonal
  // Case 5: cannot capture own piece
  if (xDist !== yDist) {
    return { isLegal: false };
  }
  // Case 1
  if (startY < endY && startX > endX) {
    let y = startY + 1;
    for (let x = startX - 1; x > endX; x--) {
      if (board[x][y] !== 0) {
        return { isLegal: false };
      }
      y++;
    }
  }
  // Case 2
  else if (startY < endY && startX < endX) {
    let y = startY + 1;
    for (let x = startX + 1; x < endX; x++) {
      if (board[x][y] !== 0) {
        return { isLegal: false };
      }
      y++;
    }
  }
  // Case 3
  else if (startY > endY && startX > endX) {
    let x = startX - 1;
    for (let y = startY - 1; y > endY; y--) {
      if (board[x][y] !== 0) {
        return { isLegal: false };
      }
      x--;
    }
  }
  // Case 4
  else if (startY > endY && startX < endX) {
    let y = startY - 1;
    for (let x = startX + 1; x < endX; x++) {
      if (board[x][y] !== 0) {
        return { isLegal: false };
      }
      y--;
    }
  }
  // Case 5
  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return { isLegal: false };
  } else {
    return { isLegal: true };
  }
};

module.exports = bishopMove;
