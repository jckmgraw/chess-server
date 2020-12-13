const { getPosFromIndexes } = require('./checkmateAssist/pieceUtil');
const isMoveLegal = require('./checkmateAssist/isMoveLegal');
const isKingInCheck = require('./checkmateAssist/isKingInCheck');
const { isSquareThreatened } = require('./checkmateAssist/isSquareThreatened');

const isCheckmate = ({ board, king }) => {
  // Case 1: king is in check
  // Case 2: can king move out of check
  // Case 3: - for each piece 'X'
  //         - for each legal move of 'X'
  //         - is king square threatened?

  // Case 1
  if (!isKingInCheck({ board, king })) {
    return false;
  }

  // Case 2
  let kingPos, kingX, kingY;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (board[x][y] === king) {
        kingPos = getPosFromIndexes([x, y]);
        kingX = x;
        kingY = y;
        break;
      }
    }
  }
  if (kingPos == null) console.error('issue in isCheckmate');
  for (let x = kingX - 1; x < kingX + 3; x++) {
    for (let y = kingY - 1; y < kingY + 3; y++) {
      if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
        const pos = getPosFromIndexes([x, y]);
        if (
          ((king > 0 && board[x][y] <= 0) || (king < 0 && board[x][y] >= 0)) &&
          isSquareThreatened({
            board,
            pos: pos,
            piece: king,
          })
        ) {
          return false;
        }
      }
    }
  }

  // Case 3
  const boardCopy = JSON.parse(JSON.stringify(board));
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const piece = boardCopy[x][y];
      const startPos = getPosFromIndexes([x, y]);
      boardCopy[x][y] = 0;
      if ((king > 0 && piece > 0) || (king < 0 && piece < 0)) {
        for (let x2 = 0; x2 < 8; x2++) {
          for (let y2 = 0; y2 < 8; y2++) {
            const endPos = getPosFromIndexes([x2, y2]);
            if (isMoveLegal({ board: boardCopy, startPos, endPos, piece })) {
              return false;
            }
          }
        }
      }
    }
  }
  return true;
};

module.exports = isCheckmate;
