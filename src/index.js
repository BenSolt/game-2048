import React from "react";
import ReactDOM from "react-dom";

import "./AppGame.css";
import GameProvider from "./components/GameProvider";
import App from "./App";

const Root = () => (
  <GameProvider>
    <App />
  </GameProvider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);
