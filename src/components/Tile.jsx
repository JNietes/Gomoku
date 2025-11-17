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
  pyodideReady
  }){

  const [shouldPrintBoard, setShouldPrintBoard] = useState(false);
    
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

  if (currentTurn == 0) {
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

      // Converts script.py to string that is passed into the Pyodide filesystem with the same name
      if (!pyodideReady) {
        console.log("pyodide not ready");
        return;
      }

      try {
        const base = import.meta.env.BASE_URL || '/';
        const scriptUrl = `${base}python/script.py`; // if you placed it at public/python/script.py
        const resp = await fetch(scriptUrl);
        if (!resp.ok) throw new Error(`Failed to fetch ${scriptUrl}: ${resp.status}`);
        const pythonCode = await resp.text();
        pyodide.FS.writeFile('/home/pyodide/script.py', pythonCode);
        console.log("Fetching Python script...");

        console.log("Printing board:");
        const result = await pyodide.runPythonAsync('import script; script.print_matrix(matrix)');
        console.log(result);
      } 
      catch (error) {
        console.error("Error loading or running Python script:", error);
      }
    }
    
    printBoard();
    setShouldPrintBoard(false);
  }, [shouldPrintBoard]); // Remove dependencies to prevent infinite reloads

  function handleClick() {
    if (currentTurn != 0 && pyodideReady) {
      if (matrix[row][col] == 0) {
        let copy = Array.from(matrix);
        if (currentTurn == -1) {
          copy[row][col] = -1;
        } else {
          copy[row][col] = 1;
        }
        setMatrix(copy);
        setShouldPrintBoard(true);
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
                currentTurn = 0; // No one's turn so game stops
                setCurrentTurn(currentTurn);
              }
          }
        }  
      }

      // -1: black; 1: white;
      setCurrentTurn(-currentTurn);
    }
  }

  return <button className={colorClass} onClick={handleClick}></button>;
}

export default Tile;
