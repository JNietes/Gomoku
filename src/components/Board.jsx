import { useState } from "react";
import Tile from "./Tile";

function Board() {
  const size = 13;
  const [currentTurn, setCurrentTurn] = useState(-1);

  // Stores the stones placed on the board.
  // 0: none; -1: black; 1: white;
  const [matrix, setMatrix] = useState(
    Array(size)
      .fill(0)
      .map(() => Array(size).fill(0))
  );

  return (
    <div className="board">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="boardRow">
          {row.map((_, colIndex) => (
            <Tile
              key={rowIndex + "," + colIndex}
              index={rowIndex + "," + colIndex}
              element={matrix[rowIndex][colIndex]}
              matrix={matrix}
              setMatrix={setMatrix}
              currentTurn={currentTurn}
              setCurrentTurn={setCurrentTurn}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
