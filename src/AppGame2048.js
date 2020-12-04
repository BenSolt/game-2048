import React, { useState } from "react";
import "./styles.css";
import Grid from "./components/Grid";

const App = () => {
  const [count, setCount] = useState(0);
  const countIncrease = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <div
        // style={{
        //   margin: "0 auto",
        //   width: "100%",
        //   height: "100%"
        // }}
      >
        <div>
          <h1 >
            Count : {count}
          </h1>
        </div>
        <Grid countIncrease={countIncrease} />
      </div>
    </div>
  );
};

export default App;