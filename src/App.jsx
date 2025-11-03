import { useState } from "react";
import "./App.css";
import {Board, TurnIndicator} from "./components";

function App() {
  const [currentTurn, setCurrentTurn] = useState(-1);

  return (
    <>
      <h1>Gomoku Board</h1>
      <TurnIndicator currentTurn={currentTurn}/>
      <Board currentTurn={currentTurn} setCurrentTurn={setCurrentTurn}/>
    </>
  );
}

export default App;
