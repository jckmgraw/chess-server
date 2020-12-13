const pawnMove = require('../pieces/pawnLogic');
const rookMove = require('../pieces/rookLogic');
const knightMove = require('../pieces/knightLogic');
const bishopMove = require('../pieces/bishopLogic');
const queenMove = require('../pieces/queenLogic');
const kingMove = require('../pieces/kingLogic');
const isKingInCheck = require('../checkmate');
const { getPieceFromBoardPos } = require('./pieceUtil');

const isMoveLegal = ({
  board,
  startPos,
  endPos,
  kingStuff,
  isCheckingForSquareThreatened,
  isCalledFromIsKingInCheck = false,
}) => {
  const piece = getPieceFromBoardPos(board, startPos);
  const pieceType = Math.abs(piece);

  // Case 1: piece doesn't change position
  // Case 2: moving piece puts king in check
  // Case 3: piece specific logic

  // Case 1
  if (startPos === endPos) return false;

  // Case 2
  if (!isCalledFromIsKingInCheck) {
    let king;
    if (piece > 0) king = ENV.WHITE_KING;
    else if (piece < 0) king = ENV.BLACK_KING;
    const diffBoard = JSON.parse(JSON.stringify(board));
    const indexes = getIndexesFromPos(startPos);
    const x = indexes[0];
    const y = indexes[1];
    diffBoard[x][y] = 0;
    if (isKingInCheck({ board: diffBoard, king })) return false;
  }

  // Case 3
  if (pieceType === ENV.WHITE_PAWN) {
    return pawnMove({
      board,
      startPos,
      endPos,
      piece,
      isCheckingForSquareThreatened,
    });
  } else if (pieceType === ENV.WHITE_ROOK) {
    return rookMove({ board, startPos, endPos, piece });
  } else if (pieceType === ENV.WHITE_KNIGHT) {
    return knightMove({ board, startPos, endPos, piece });
  } else if (pieceType === ENV.WHITE_BISHOP) {
    return bishopMove({ board, startPos, endPos, piece });
  } else if (pieceType === ENV.WHITE_QUEEN) {
    return queenMove({ board, startPos, endPos, piece });
  } else if (pieceType === ENV.WHITE_KING) {
    return kingMove({
      board,
      startPos,
      endPos,
      piece,
      kingStuff,
      isCheckingForSquareThreatened,
    });
  } else {
    console.error(
      `unknown piece in isMoveLegal(): startPos: ${startPos}, endPos: ${endPos}`
    );
    return { isLegal: false, isCastling: false };
  }
};

module.exports = isMoveLegal;
