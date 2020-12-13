const {
  getIndexesFromPos,
  getPieceFromBoardPos,
} = require('../checkmateAssist/pieceUtil');
const ENV = require('../../env');

const pawnMove = ({
  board,
  startPos,
  endPos,
  piece,
  isCheckingForSquareThreatened = false,
}) => {
  const i = getIndexesFromPos(startPos);
  const startX = i[0];
  const startY = i[1];
  const j = getIndexesFromPos(endPos);
  const endX = j[0];
  const endY = j[1];
  const endPosPiece = getPieceFromBoardPos(board, endPos);

  if (isCheckingForSquareThreatened) {
    if (piece === ENV.WHITE_PAWN) {
      if (startY + 1 === endY && (startX + 1 === endX || startX - 1 === endX)) {
        return { isLegal: true };
      }
    } else {
      if (startY - 1 === endY && (startX + 1 === endX || startX - 1 === endX)) {
        return { isLegal: true };
      }
    }
    return { isLegal: false };
  }

  // TODO: improve code readability
  // Case 1: Move forward one
  // Case 2: First move 2 moves forward
  // Case 3: Standard diagonal capture
  // Case 4: En Passant (TODO)
  // Case 5: Pawn upgrade (TODO)
  if (piece === ENV.WHITE_PAWN) {
    if (startY > endY) {
      return { isLegal: false };
    }
    // Case 3
    if (startX !== endX) {
      if (
        endPosPiece < 0 &&
        Math.abs(startX - endX) === 1 &&
        endY - startY === 1
      ) {
        return { isLegal: true };
      }
      return { isLegal: false };
    }
    // Cases 1 & 2
    if (
      endPosPiece === 0 &&
      ((startY === 1 && Math.abs(endY - startY) <= 2) ||
        Math.abs(endY - startY) === 1) &&
      board[startX][startY + 1] === 0
    ) {
      return { isLegal: true };
    }
    return { isLegal: false };
  } else if (piece === ENV.BLACK_PAWN) {
    if (startY < endY) {
      return { isLegal: false };
    }
    // Case 3
    if (startX !== endX) {
      if (
        endPosPiece > 0 &&
        Math.abs(startX - endX) === 1 &&
        Math.abs(endY - startY) === 1
      ) {
        return { isLegal: true };
      }
      return { isLegal: false };
    }
    // Cases 1 & 2
    if (
      endPosPiece === 0 &&
      ((startY === 6 && Math.abs(endY - startY) <= 2) ||
        Math.abs(endY - startY) === 1) &&
      board[startX][startY - 1] === 0
    ) {
      return { isLegal: true };
    }
    return { isLegal: false };
  } else {
    console.error('unknown piece type');
    return { isLegal: false };
  }
};

module.exports = pawnMove;
