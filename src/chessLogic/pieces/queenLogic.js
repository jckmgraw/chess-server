const rookMove = require('./rookLogic');
const bishopMove = require('./bishopLogic');

const canRookMove = ({ board, startPos, endPos, piece }) => {
  const { isLegal } = rookMove({ board, startPos, endPos, piece });
  if (isLegal) return true;
};

const canBishopMove = ({ board, startPos, endPos, piece }) => {
  const { isLegal } = bishopMove({ board, startPos, endPos, piece });
  if (isLegal) return true;
};

const queenMove = ({ board, startPos, endPos, piece }) => {
  if (
    canRookMove({ board, startPos, endPos, piece }) ||
    canBishopMove({ board, startPos, endPos, piece })
  ) {
    return { isLegal: true };
  }
  return { isLegal: false };
};

module.exports = queenMove;
