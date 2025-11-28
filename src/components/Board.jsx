import { useEffect, useState } from "react";
import Tile from "./Tile";

function Board({
  currentTurn,
  setCurrentTurn,
  matrix,
  setMatrix,
  pyodideReady,
  gameRunning,
  setGameRunning,
  generatingMoves
  }){
  
  return (
    <>
      <div className="board">

        {/* Storing the indexes of the tiles by mapping x,y coordinates to a react key*/}
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
                pyodideReady={pyodideReady}
                gameRunning={gameRunning}
                setGameRunning={setGameRunning}
                generatingMoves={generatingMoves}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
