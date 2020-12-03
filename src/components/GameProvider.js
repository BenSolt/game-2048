import React, { createContext, useReducer, useEffect } from "react";

export const GameContext = createContext();

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    board: [],
    score: 0,
    gameOver: false,
    message: null
  });

  useEffect(() => {
    dispatch({ type: "@initBoard" });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "@initBoard":
      return initBoard();
    case "@moveUp":
      return move("up", state);
    case "@moveDown":
      return move("down", state);
    case "@moveLeft":
      return move("left", state);
    case "@moveRight":
      return move("right", state);
    default:
      return state;
  }
};

const initBoard = () => {
  let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  board = placeRandom(placeRandom(board));
  return { board, score: 0, gameOver: false, message: null };
};

const getBlankCoordinates = board => {
  const blankCoordinates = [];

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) {
        blankCoordinates.push([r, c]);
      }
    }
  }

  return blankCoordinates;
};

// Grab random start number
const randomStartingNumber = () => {
  const startingNumbers = [2, 4];
  const randomNumber =
    startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
  return randomNumber;
};

// Place random starting number on an empty coordinate
const placeRandom = board => {
  const blankCoordinates = getBlankCoordinates(board);
  const randomCoordinate =
    blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
  const randomNumber = randomStartingNumber();
  board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
  return board;
};

// Compares two boards to check for movement
const boardMoved = (original, updated) => {
  return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
};

// Moves board depending on direction and checks for game over
const move = (direction, state) => {
  if (!state.gameOver) {
    if (direction === "up") {
      const movedUp = moveUp(state.board);
      if (boardMoved(state.board, movedUp.board)) {
        const upWithRandom = placeRandom(movedUp.board);

        if (checkForGameOver(upWithRandom)) {
          return {
            board: upWithRandom,
            gameOver: true,
            message: "Game over!"
          };
        } else {
          return {
            board: upWithRandom,
            score: (state.score += movedUp.score)
          };
        }
      }
    } else if (direction === "right") {
      const movedRight = moveRight(state.board);
      if (boardMoved(state.board, movedRight.board)) {
        const rightWithRandom = placeRandom(movedRight.board);

        if (checkForGameOver(rightWithRandom)) {
          return {
            board: rightWithRandom,
            gameOver: true,
            message: "Game over!"
          };
        } else {
          return {
            board: rightWithRandom,
            score: (state.score += movedRight.score)
          };
        }
      }
    } else if (direction === "down") {
      const movedDown = moveDown(state.board);
      if (boardMoved(state.board, movedDown.board)) {
        const downWithRandom = placeRandom(movedDown.board);

        if (checkForGameOver(downWithRandom)) {
          return {
            board: downWithRandom,
            gameOver: true,
            message: "Game over!"
          };
        } else {
          return {
            board: downWithRandom,
            score: (state.score += movedDown.score)
          };
        }
      }
    } else if (direction === "left") {
      const movedLeft = moveLeft(state.board);
      if (boardMoved(state.board, movedLeft.board)) {
        const leftWithRandom = placeRandom(movedLeft.board);

        if (checkForGameOver(leftWithRandom)) {
          return {
            board: leftWithRandom,
            gameOver: true,
            message: "Game over!"
          };
        } else {
          return {
            board: leftWithRandom,
            score: (state.score += movedLeft.score)
          };
        }
      }
    }
  } else {
    return { message: "Game over. Please start a new game." };
  }
};

const moveUp = inputBoard => {
  let rotatedRight = rotateRight(inputBoard);
  let board = [];
  let score = 0;

  // Shift all numbers to the right
  for (let r = 0; r < rotatedRight.length; r++) {
    let row = [];
    for (let c = 0; c < rotatedRight[r].length; c++) {
      let current = rotatedRight[r][c];
      current === 0 ? row.unshift(current) : row.push(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to right
  for (let r = 0; r < board.length; r++) {
    for (let c = board[r].length - 1; c >= 0; c--) {
      if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c - 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
        board[r][c] = board[r][c - 1];
        board[r][c - 1] = 0;
      }
    }
  }

  // Rotate board back upright
  board = rotateLeft(board);

  return { board, score };
};

const moveRight = inputBoard => {
  let board = [];
  let score = 0;

  // Shift all numbers to the right
  for (let r = 0; r < inputBoard.length; r++) {
    let row = [];
    for (let c = 0; c < inputBoard[r].length; c++) {
      let current = inputBoard[r][c];
      current === 0 ? row.unshift(current) : row.push(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to right
  for (let r = 0; r < board.length; r++) {
    for (let c = board[r].length - 1; c >= 0; c--) {
      if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c - 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
        board[r][c] = board[r][c - 1];
        board[r][c - 1] = 0;
      }
    }
  }

  return { board, score };
};

const moveDown = inputBoard => {
  let rotatedRight = rotateRight(inputBoard);
  let board = [];
  let score = 0;

  // Shift all numbers to the left
  for (let r = 0; r < rotatedRight.length; r++) {
    let row = [];
    for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
      let current = rotatedRight[r][c];
      current === 0 ? row.push(current) : row.unshift(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to left
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c + 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
        board[r][c] = board[r][c + 1];
        board[r][c + 1] = 0;
      }
    }
  }

  // Rotate board back upright
  board = rotateLeft(board);

  return { board, score };
};

const moveLeft = inputBoard => {
  let board = [];
  let score = 0;

  // Shift all numbers to the left
  for (let r = 0; r < inputBoard.length; r++) {
    let row = [];
    for (let c = inputBoard[r].length - 1; c >= 0; c--) {
      let current = inputBoard[r][c];
      current === 0 ? row.push(current) : row.unshift(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to left
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c + 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
        board[r][c] = board[r][c + 1];
        board[r][c + 1] = 0;
      }
    }
  }

  return { board, score };
};

const rotateRight = matrix => {
  let result = [];

  for (let c = 0; c < matrix.length; c++) {
    let row = [];
    for (let r = matrix.length - 1; r >= 0; r--) {
      row.push(matrix[r][c]);
    }
    result.push(row);
  }

  return result;
};

const rotateLeft = matrix => {
  let result = [];

  for (let c = matrix.length - 1; c >= 0; c--) {
    let row = [];
    for (let r = matrix.length - 1; r >= 0; r--) {
      row.unshift(matrix[r][c]);
    }
    result.push(row);
  }

  return result;
};

// Check to see if there are any moves left
const checkForGameOver = board => {
  let moves = [
    boardMoved(board, moveUp(board).board),
    boardMoved(board, moveRight(board).board),
    boardMoved(board, moveDown(board).board),
    boardMoved(board, moveLeft(board).board)
  ];

  return moves.includes(true) ? false : true;
};
