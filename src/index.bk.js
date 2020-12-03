import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Row from "./Row";

export default () => {
  const [state, setState] = useState({
    board: [],
    score: 0,
    gameOver: false,
    message: null
  });
  // Create board with two random coordinate numbers
  const initBoard = () => {
    let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    // let board = [];
    // for (let i = 0; i < n; i++) {
    //   const row = [];
    //   for (let j = 0; j < n; j++) {
    //     row.push(0);
    //   }
    //   board.push(row);
    // }
    board = placeRandom(placeRandom(board));
    setState({ board, score: 0, gameOver: false, message: null });
  };

  // Get all blank coordinates from board
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
  const move = direction => {
    if (!state.gameOver) {
      if (direction === "up") {
        const movedUp = moveUp(state.board);
        if (boardMoved(state.board, movedUp.board)) {
          const upWithRandom = placeRandom(movedUp.board);

          if (checkForGameOver(upWithRandom)) {
            setState({
              board: upWithRandom,
              gameOver: true,
              message: "Game over!"
            });
          } else {
            setState({
              board: upWithRandom,
              score: (state.score += movedUp.score)
            });
          }
        }
      } else if (direction === "right") {
        const movedRight = moveRight(state.board);
        if (boardMoved(state.board, movedRight.board)) {
          const rightWithRandom = placeRandom(movedRight.board);

          if (checkForGameOver(rightWithRandom)) {
            setState({
              board: rightWithRandom,
              gameOver: true,
              message: "Game over!"
            });
          } else {
            setState({
              board: rightWithRandom,
              score: (state.score += movedRight.score)
            });
          }
        }
      } else if (direction === "down") {
        const movedDown = moveDown(state.board);
        if (boardMoved(state.board, movedDown.board)) {
          const downWithRandom = placeRandom(movedDown.board);

          if (checkForGameOver(downWithRandom)) {
            setState({
              board: downWithRandom,
              gameOver: true,
              message: "Game over!"
            });
          } else {
            setState({
              board: downWithRandom,
              score: (state.score += movedDown.score)
            });
          }
        }
      } else if (direction === "left") {
        const movedLeft = moveLeft(state.board);
        if (boardMoved(state.board, movedLeft.board)) {
          const leftWithRandom = placeRandom(movedLeft.board);

          if (checkForGameOver(leftWithRandom)) {
            setState({
              board: leftWithRandom,
              gameOver: true,
              message: "Game over!"
            });
          } else {
            setState({
              board: leftWithRandom,
              score: (state.score += movedLeft.score)
            });
          }
        }
      }
    } else {
      setState({ message: "Game over. Please start a new game." });
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

  // componentWillMount() {
  //   initBoard();
  //   const body = document.querySelector("body");
  //   body.addEventListener("keydown", handleKeyDown.bind(this));
  // }

  useEffect(() => {
    initBoard();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move]);

  const handleKeyDown = e => {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    const n = 78;

    if (e.keyCode === up) {
      move("up");
    } else if (e.keyCode === right) {
      move("right");
    } else if (e.keyCode === down) {
      move("down");
    } else if (e.keyCode === left) {
      move("left");
    } else if (e.keyCode === n) {
      initBoard();
    }
  };

  return (
    <div>
      <div
        className="button"
        onClick={() => {
          initBoard();
        }}
      >
        New Game
      </div>

      <div className="buttons">
        <div
          className="button"
          onClick={() => {
            move("up");
          }}
        >
          Up
        </div>
        <div
          className="button"
          onClick={() => {
            move("right");
          }}
        >
          Right
        </div>
        <div
          className="button"
          onClick={() => {
            move("down");
          }}
        >
          Down
        </div>
        <div
          className="button"
          onClick={() => {
            move("left");
          }}
        >
          Left
        </div>
      </div>

      <div className="score">Score: {state.score}</div>

      <table>
        {state.board.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </table>

      <p>{state.message}</p>
    </div>
  );
};