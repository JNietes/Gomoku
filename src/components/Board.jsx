import { useState } from "react";
import Tile from "./Tile";

function Board() {
  const [size, setSize] = useState(13);
  const [currentTurn, setCurrentTurn] = useState(-1);

  // Represents all pieces withing a 4 tile star radius.
  const [winMat, setWinMat] = useState([
    [[-4, -4], [-3, -3], [-2, -2], [-1, -1], [1, 1], [2, 2], [3, 3], [4, 4]], // \
    [[-4, 4], [-3, 3], [-2, 2], [-1, 1], [1, -1], [2, -2], [3, -3], [4, -4]],  // /
    [[-4, 0], [-3, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 0], [4, 0]],     // |
    [[0, -4], [0, -3], [0, -2], [0, -1], [0, 1], [0, 2], [0, 3], [0, 4]]]     // -
  );

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
              size={size}
              index={rowIndex + "," + colIndex}
              element={matrix[rowIndex][colIndex]}
              matrix={matrix}
              setMatrix={setMatrix}
              currentTurn={currentTurn}
              setCurrentTurn={setCurrentTurn}
              winMat={winMat}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
