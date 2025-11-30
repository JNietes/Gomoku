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
  setGameRunning,
  generatingMoves
  }){
    
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

  async function printBoard() {
    if (!pyodideReady) return;
    await pyodide.runPythonAsync('current_board.print_board()');
  }

  async function printMoves() {
    if (!pyodideReady) return;
    await pyodide.runPythonAsync('current_board.print_moves()');
  }

  async function detectWin() {
    if (!pyodideReady) return;

    const someoneWon = await pyodide.runPythonAsync('current_board.detect_winner(color_int, row, col)')
    return !!someoneWon;
  }

  async function placeTile() {
    if (!pyodideReady) return;
    
    await pyodide.globals.set('color_int', parseInt(currentTurn));
    await pyodide.globals.set('row', parseInt(row));
    await pyodide.globals.set('col', parseInt(col));

    const newMatrix = await pyodide.runPythonAsync('current_board.place_stone(color_int, row, col)');

    setMatrix(newMatrix); // Updating matrix in react useState
  }

  async function randomOpponentPlacement() {

    await pyodide.globals.set('color_int', parseInt(-currentTurn));
    await pyodide.globals.set('row', parseInt(row));
    await pyodide.globals.set('col', parseInt(col));

    const newMatrix = await pyodide.runPythonAsync('current_board.place_stone_randomly(color_int)');

    setMatrix(newMatrix); // Updating matrix in react useState
  }

  async function handleClick() {
    if (gameRunning && pyodideReady) {
      if (matrix[row][col] == 0) {

        await placeTile();
        
        const playerWon = await detectWin();
        if (playerWon) {
          setGameRunning(false)
          return; // To not place opponent tile after game is won
        }

        if (generatingMoves) {
          await randomOpponentPlacement();

          const opponentWon = await detectWin();
          if (opponentWon) {
            setCurrentTurn(-currentTurn);
            setGameRunning(false)
          }
        } else { // Swap turns when not generating moves
          setCurrentTurn(-currentTurn);
        }
        
        await printBoard();
        await printMoves();
      }
    }
  }

  return <button className={colorClass} onClick={handleClick}></button>;
}

export default Tile;
