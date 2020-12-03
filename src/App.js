import React, { useState, useEffect, useContext } from "react";

import Row from "./components/Row";
import GameProvider, { GameContext } from "./components/GameProvider";
export default () => {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div>
      <div className="button" onClick={() => dispatch({ type: "@initBoard" })}>
        New Game
      </div>

      <div className="buttons">
        <div className="button" onClick={() => dispatch({ type: "@moveUp" })}>
          Up
        </div>
        <div
          className="button"
          onClick={() => dispatch({ type: "@moveRight" })}
        >
          Right
        </div>
        <div className="button" onClick={() => dispatch({ type: "@moveDown" })}>
          Down
        </div>
        <div className="button" onClick={() => dispatch({ type: "@moveLeft" })}>
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
