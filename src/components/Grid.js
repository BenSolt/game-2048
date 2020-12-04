import React, { useState } from "react";
import "../styles.css";
import { onLeft, onRight, onTop, onBottom } from "./functions";

const Grid = ({ countIncrease }) => {
  let [data, setData] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, 2, null],
    [2, null, null, null, null]
  ]);

  const handleKeyPress = (e) => {
    if (e.key === "a" || e.key === "ArrowLeft") {
      setData(onLeft(data, countIncrease));
    }

    if (e.key === "d" || e.key === "ArrowRight" || e.key === "Right" ) {
      setData(onRight(data, countIncrease));
    }
    if (e.key === "w" || e.key === "ArrowUp") {
      setData(onTop(data, countIncrease));
    }
    if (e.key === "s" || e.key === "ArrowDown") {
      setData(onBottom(data, countIncrease));
    }
  };
  return (
    <div
      className="grid"
      style={{ outline: "none" }}
      tabIndex="0"
      onKeyPress={handleKeyPress}
    >
      {data.map((val, index) => {
        return val.map((innerVal, innerIndex) => {
          return (
            <div
              key={`${index}-${innerIndex}`}
              className={innerVal ? "valid" : "invalid"}
            >
              {innerVal}
            </div>
          );
        });
      })}
    </div>
  );
};

export default Grid;