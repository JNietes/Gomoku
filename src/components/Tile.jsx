import { useEffect, useState } from "react";

function Tile({
  index,
  size,
  element,
  matrix,
  setMatrix,
  currentTurn,
  setCurrentTurn,
  winMat,
  pyodideReady,
  gameRunning,
  setGameRunning
  }){

  const [shouldPrintBoard, setShouldPrintBoard] = useState(false);
  const [shouldPlaceTile, setShouldPlaceTile] = useState(false);
    
  const row = index.split(",")[0];
  const col = index.split(",")[1];

  let colorClass = "";
  let currentColor = "";

  if (currentTurn == -1) {
    colorClass = "blackTurn";
    currentColor = "Black";
  }

  if (currentTurn == 1) {
    colorClass = "whiteTurn";
    currentColor = "White";
  }

  if (!gameRunning) {
    colorClass = "deadTile"; // Dead, as in not animated
  }

  if (element == -1) {
    colorClass = "blackStone";
  }

  if (element == 1) {
    colorClass = "whiteStone";
  }

  function newIndexInside(index, delta, size) {
    let inside = false;
    let newIndex = parseInt(index) + parseInt(delta);
    if (newIndex >= 0 && newIndex < size) {
      inside = true;
    }
    return inside;
  }

  useEffect(() => {
    async function printBoard() {
      if (!pyodideReady) return;

      console.log("Printing board:");
      const result = await pyodide.runPythonAsync('script.print_matrix(matrix)');
      console.log(result);
    }
    printBoard();
    setShouldPrintBoard(false);
  }, [shouldPrintBoard]);

  useEffect(() => {
    async function placeTile() {
      if (!pyodideReady) return;
      
      await pyodide.globals.set('color_int', parseInt(-currentTurn));
      await pyodide.globals.set('row', parseInt(row));
      await pyodide.globals.set('col', parseInt(col));

      const newMatrix = await pyodide.runPythonAsync('script.place_tile(color_int, matrix, row, col)');

      setMatrix(newMatrix); // Updating matrix in react useState
      await pyodide.globals.set('matrix', matrix); // Updating the matrix in pyodide instance
    }
    placeTile();
    setShouldPlaceTile(false);
  }, [shouldPlaceTile]);

  function handleClick() {
    if (gameRunning && pyodideReady) {
      if (matrix[row][col] == 0) {
        setShouldPlaceTile(true);
        setCurrentTurn(-currentTurn); // Swap turns after tile placed

        setShouldPrintBoard(true);
        
        // -1: black; 1: white;
        setCurrentTurn(-currentTurn);
      }
      
      // Detect matching stones in 4 star raduis.
      let matchingStones = 0;
      for (let i = 0; i < winMat.length; i++) {
        matchingStones = 0;
        for (let j = 0; j < winMat[0].length; j++) {
          let rowDelta = winMat[i][j][0];
          let colDelta = winMat[i][j][1];
          let rowPlusDelta = parseInt(row) + parseInt(rowDelta);
          let colPlusDelta = parseInt(col) + parseInt(colDelta);

          if (
            newIndexInside(row, rowDelta, size) &&
            newIndexInside(col, colDelta, size)
          ) {

            if (matrix[rowPlusDelta][colPlusDelta] == currentTurn) {
              matchingStones++;
            }

            // Checks #/8 contiguous tiles then sets count 0
            else {
              matchingStones = 0;
            }

            if (matchingStones >= 4) {
              console.log(currentColor + " won!");
              setGameRunning(false);
              break;
            }
          }
        }  
      }
    }
  }

  return <button className={colorClass} onClick={handleClick}></button>;
}

export default Tile;
