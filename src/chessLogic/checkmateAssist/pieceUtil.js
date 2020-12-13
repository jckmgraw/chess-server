const ENV = require('../../env');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const isWhiteRookL = (startPos, piece) => {
  if (piece === ENV.WHITE_ROOK && startPos === 'a1') {
    return true;
  }
  return false;
};

const isWhiteRookR = (startPos, piece) => {
  if (piece === ENV.WHITE_ROOK && startPos === 'h1') {
    return true;
  }
  return false;
};

const isBlackRookL = (startPos, piece) => {
  if (piece === ENV.BLACK_ROOK && startPos === 'h8') {
    return true;
  }
  return false;
};

const isBlackRookR = (startPos, piece) => {
  if (piece === ENV.BLACK_ROOK && startPos === 'a8') {
    return true;
  }
  return false;
};

const getIndexesFromPos = (pos) => {
  const indexes = pos.split('');
  const xLetter = indexes[0];
  const yOff = indexes[1];
  const y = yOff - 1;
  let x;
  for (let i = 0; i < 8; i++) {
    if (xLetter === letters[i]) {
      x = i;
      break;
    }
  }
  return [x, y];
};

const getColorFromBoardPos = (board, pos) => {
  const piece = getPieceFromBoardPos(board, pos);
  if (piece > 0) return 'white';
  if (piece < 0) return 'black';
  return 'only use this function in PieceDraggable onMouseUp()';
};

const getPosFromIndexes = (indexes) => {
  const [x, y] = indexes;
  return `${letters[x]}${y + 1}`;
};

const getPieceFromBoardPos = (board, boardPos) => {
  const indexes = getIndexesFromPos(boardPos);
  const x = indexes[0];
  const y = indexes[1];
  return board[x][y];
};

const getNewBoardFromMove = ({ board, startPos, endPos, isCastling }) => {
  const piece = getPieceFromBoardPos(board, startPos);
  const indexes = getIndexesFromPos(startPos);
  const startX = indexes[0];
  const startY = indexes[1];
  const indexes2 = getIndexesFromPos(endPos);
  const endX = indexes2[0];
  const endY = indexes2[1];
  const boardCopy = board;

  if (isCastling) {
    // white
    if (endY === 0) {
      // kingside
      if (endX === 6) {
        boardCopy[7][endY] = 0;
        boardCopy[5][endY] = ENV.WHITE_ROOK;
      }
      // queenside
      else if (endX === 2) {
        boardCopy[0][endY] = 0;
        boardCopy[3][endY] = ENV.WHITE_ROOK;
      }
    }
    // black
    else if (endY === 7) {
      // kingside
      if (endX === 1) {
        boardCopy[0][endY] = 0;
        boardCopy[2][endY] = ENV.BLACK_ROOK;
      }
      // queenside
      else if (endX === 5) {
        boardCopy[7][endY] = 0;
        boardCopy[4][endY] = ENV.BLACK_ROOK;
      }
    } else {
      console.error('getnewBoardFromMove() isCastling flag');
    }
  }
  boardCopy[startX][startY] = 0;
  boardCopy[endX][endY] = piece;
  return boardCopy;
};

module.exports = {
  isWhiteRookL,
  isWhiteRookR,
  isBlackRookL,
  isBlackRookR,
  getIndexesFromPos,
  getColorFromBoardPos,
  getPosFromIndexes,
  getPieceFromBoardPos,
  getNewBoardFromMove,
};
