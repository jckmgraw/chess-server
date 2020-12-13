const {
  getIndexesFromPos,
  getPieceFromBoardPos,
} = require('../checkmateAssist/pieceUtil');
const {
  isSquareThreatened,
  isSquaresThreatened,
} = require('../checkmateAssist/isSquareThreatened');
const ENV = require('../../env');

const canWhiteKingCastle = ({
  board,
  endPos,
  hasWhiteKingMoved,
  hasWhiteRookLMoved,
  hasWhiteRookRMoved,
}) => {
  const i = getIndexesFromPos(endPos);
  const endX = i[0];
  // Case 1: has king previously moved
  // Case 2: castle kingside
  // Case 3: castle queenside

  // Case 1
  if (hasWhiteKingMoved) return false;
  // Case 2
  if (endX === 6) {
    if (hasWhiteRookRMoved) return false;
    if (
      isSquaresThreatened({
        board,
        positions: ['e1', 'f1', 'g1'],
        piece: ENV.WHITE_KING,
      })
    ) {
      return false;
    }
    if (board[5][0] === 0 && board[6][0] === 0) return true;
  }
  // Case 3
  else if (endX === 2) {
    if (hasWhiteRookLMoved) return false;
    if (
      isSquaresThreatened({
        board,
        positions: ['c1', 'd1', 'e1'],
        piece: ENV.WHITE_KING,
      })
    ) {
      return false;
    }
    if (board[1][0] === 0 && board[2][0] === 0 && board[3][0] === 0)
      return true;
  }
  return false;
};

const canBlackKingCastle = ({
  board,
  endPos,
  hasBlackKingMoved,
  hasBlackRookLMoved,
  hasBlackRookRMoved,
}) => {
  const i = getIndexesFromPos(endPos);
  const endX = i[0];
  // Case 1: has king previously moved
  // Case 2: castle kingside
  // Case 3: castle queenside

  // Case 1
  if (hasBlackKingMoved) return false;
  // Case 2
  if (endX === 1) {
    if (hasBlackRookRMoved) return false;
    if (
      isSquaresThreatened({
        board,
        positions: ['b8', 'c8', 'd8'],
        piece: ENV.BLACK_KING,
      })
    ) {
      return false;
    }
    if (board[1][7] === 0 && board[2][7] === 0) return true;
  }
  // Case 3
  else if (endX === 5) {
    if (hasBlackRookLMoved) return false;
    if (
      isSquaresThreatened({
        board,
        positions: ['d8', 'e8', 'f8'],
        piece: ENV.BLACK_KING,
      })
    ) {
      return false;
    }
    if (board[4][7] === 0 && board[5][7] === 0 && board[6][7] === 0)
      return true;
  }
  return false;
};

const kingMove = ({
  board,
  startPos,
  endPos,
  piece,
  isCheckingForSquareThreatened = false,
  kingStuff,
}) => {
  let hasWhiteKingMoved,
    hasBlackKingMoved,
    hasWhiteRookLMoved,
    hasWhiteRookRMoved,
    hasBlackRookLMoved,
    hasBlackRookRMoved;
  if (kingStuff != null) {
    hasWhiteKingMoved = kingStuff.hasWhiteKingMoved;
    hasBlackKingMoved = kingStuff.hasBlackKingMoved;
    hasWhiteRookRMoved = kingStuff.hasWhiteRookRMoved;
    hasBlackRookLMoved = kingStuff.hasBlackRookLMoved;
    hasBlackRookRMoved = kingStuff.hasBlackRookRMoved;
  }
  const i = getIndexesFromPos(startPos);
  const startX = i[0];
  const startY = i[1];
  const j = getIndexesFromPos(endPos);
  const endX = j[0];
  const endY = j[1];
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  const xDist = Math.abs(startX - endX);
  const yDist = Math.abs(startY - endY);

  // Case 1: cannot move into check
  // Case 2: cannot capture own piece
  // Case 3: standard movement
  // Case 4: castle kingside/queenside

  // Case 1
  if (
    !isCheckingForSquareThreatened &&
    isSquareThreatened({ board, pos: endPos, piece })
  ) {
    return { isLegal: false, isCastling: false };
  }
  // Case 2
  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return { isLegal: false, isCastling: false };
  }
  // Case 3
  else if (
    (xDist === 1 && yDist === 1) ||
    (xDist === 1 && yDist === 0) ||
    (xDist === 0 && yDist === 1)
  ) {
    return { isLegal: true, isCastling: false };
  }
  // Case 4
  else if (!isCheckingForSquareThreatened && xDist === 2 && yDist === 0) {
    if (
      piece === ENV.WHITE_KING &&
      canWhiteKingCastle({
        board,
        endPos,
        hasWhiteKingMoved,
        hasWhiteRookLMoved,
        hasWhiteRookRMoved,
      })
    ) {
      return { isLegal: true, isCastling: true };
    } else if (
      piece === ENV.BLACK_KING &&
      canBlackKingCastle({
        board,
        endPos,
        hasBlackKingMoved,
        hasBlackRookLMoved,
        hasBlackRookRMoved,
      })
    ) {
      return { isLegal: true, isCastling: true };
    }
  }
  return { isLegal: false, isCastling: false };
};

module.exports = kingMove;
