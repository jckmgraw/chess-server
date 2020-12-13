const {
  getIndexesFromPos,
  getPieceFromBoardPos,
} = require('../checkmateAssist/pieceUtil');

const knightMove = ({ board, startPos, endPos, piece }) => {
  const i = getIndexesFromPos(startPos);
  const startX = i[0];
  const startY = i[1];
  const j = getIndexesFromPos(endPos);
  const endX = j[0];
  const endY = j[1];
  const endPosPiece = getPieceFromBoardPos(board, endPos);
  const xDist = Math.abs(startX - endX);
  const yDist = Math.abs(startY - endY);

  if ((piece > 0 && endPosPiece > 0) || (piece < 0 && endPosPiece < 0)) {
    return { isLegal: false };
  } else if ((xDist === 2 && yDist === 1) || (xDist === 1 && yDist === 2)) {
    return { isLegal: true };
  } else {
    return { isLegal: false };
  }
};

module.exports = knightMove;
