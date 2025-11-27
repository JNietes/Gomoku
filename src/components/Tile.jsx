import { useEffect, useState } from "react";

function Tile({
  index,
  element,
  matrix,
  setMatrix,
  currentTurn,
  setCurrentTurn,
  pyodideReady,
  gameRunning,
  setGameRunning
  }){

  const [shouldPrintBoard, setShouldPrintBoard] = useState(false);
  const [shouldPlaceTile, setShouldPlaceTile] = useState(false);
    
  // These are the coordinates of a node that is clicked
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
      
      await pyodide.globals.set('color_int', parseInt(currentTurn));
      await pyodide.globals.set('row', parseInt(row));
      await pyodide.globals.set('col', parseInt(col));

      const newMatrix = await pyodide.runPythonAsync('script.place_tile(color_int, matrix, row, col)');

      await pyodide.globals.set('matrix', newMatrix); // Updating the matrix in pyodide instance
      setMatrix(newMatrix); // Updating matrix in react useState
      setCurrentTurn(-currentTurn); // Swap turns after tile placed
    }
    placeTile();

    async function detectWin() {
      if (!pyodideReady) return;

      const someoneWon = await pyodide.runPythonAsync('script.detect_winner(color_int, matrix, row, col)')
      if (someoneWon) {
        setGameRunning(false);
      }
    }
    detectWin();

    setShouldPlaceTile(false);
  }, [shouldPlaceTile]);

  function handleClick() {
    if (gameRunning && pyodideReady) {
      if (matrix[row][col] == 0) {
        setShouldPlaceTile(true);
        setShouldPrintBoard(true);
      }
    }
  }

  return <button className={colorClass} onClick={handleClick}></button>;
}

export default Tile;
