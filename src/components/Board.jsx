import { useEffect, useState } from "react";
import Tile from "./Tile";

function Board({
  currentTurn,
  setCurrentTurn,
  size,
  matrix,
  setMatrix,
  pyodideReady,
  gameRunning,
  setGameRunning
  }){
  
  // Represents all pieces withing a 4 tile star radius.
  const [winMat, setWinMat] = useState([
    [[-4, -4], [-3, -3], [-2, -2], [-1, -1], [1, 1], [2, 2], [3, 3], [4, 4]], // \
    [[-4, 4], [-3, 3], [-2, 2], [-1, 1], [1, -1], [2, -2], [3, -3], [4, -4]], // /
    [[-4, 0], [-3, 0], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 0], [4, 0]],     // |
    [[0, -4], [0, -3], [0, -2], [0, -1], [0, 1], [0, 2], [0, 3], [0, 4]]]     // -
  );

  return (
    <>
      <div className="board">

        {/* Storing the indexes of the tiles by mapping x,y coordinates to a react key*/}
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
                pyodideReady={pyodideReady}
                gameRunning={gameRunning}
                setGameRunning={setGameRunning}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
