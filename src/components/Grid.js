import React, { useState } from "react";
import "../AppGame2048.css";
import { onLeft, onRight, onTop, onBottom } from "./functions";

const Grid = ({ countIncrease }) => {
  let [data, setData] = useState([

    [null, null, null, null],
    [null, null, 2, null],
    [null, null, null, null],
    [2, null, null, null]

  ]);

  const [changecolor, setChangecolor] = useState(0);
  const [change, setChange] = useState('white');

  /////////////////////////////////////////////////
  function changeClass() {
    document.getElementById('test').className = "valid2";
  
    // document.getElementById('pId').innerHTML = "New class name: " + button_class;
  }

  /////////////////////////////////////////////////


  const handleKeyPress = (e) => {

    if (e.key === "a" || e.key === "ArrowLeft") {
      setData(onLeft(data, countIncrease));
      // setChangecolor(changeClass)

      console.log('Left')
    }

    if (e.key === "d") {
      setData(onRight(data, countIncrease));
      console.log('Right')
    }
    if (e.key === "w") {
      setData(onTop(data, countIncrease));
      console.log('Up')
    }
    if (e.key === "s") {
      setData(onBottom(data, countIncrease));
      console.log('Down')
    }
  };


  var colors = [
    "orange",
    "red",
    "magenta",
    "green",
    "blue",
    "cyan",
    "purple",
    "midnightblue",
    "lime",
    "pink",
    "black"
  ];



  return (
    <div className='Container'>
      <div className='info'>
        How to play
        <button onClick={changeClass}>CLICK</button>
      </div>

      <div
        className="grid"
        style={{ outline: "none" }}
        tabIndex="0"
        onKeyPress={handleKeyPress}
      >

        {data.map((val, index) => {

          // return (
            
          //   <div className='valid' id='test'>{val}</div>
          // )
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
    </div>
  );
};

export default Grid;
