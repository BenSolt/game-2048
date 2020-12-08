import React, { useState } from "react";
import "./AppGame2048.css";
import Grid from "./components/Grid";

const App = () => {
  const [count, setCount] = useState(0);
  const countIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <div>
        <div>
          
          {/* <button id="buttonId" onClick={}>Click</button> */}
          <h1 >
            The Game 2048
            {/* Count : {count} */}
          </h1>
         
         
        </div>
          <Grid countIncrease={countIncrease} />
      </div>
    </div>
  );
};

export default App;