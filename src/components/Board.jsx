import { useEffect, useState } from "react";
import { loadPyodide } from 'pyodide';
import Tile from "./Tile";

function Board() {
  const [size, setSize] = useState(13);
  const [currentTurn, setCurrentTurn] = useState(-1);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [output, setOutput] = useState('');
  
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

  useEffect(() => {
    async function initializePyodide() {
      const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/"
      })
      
      window.pyodide = pyodide; // Make pyodide globally accessible if needed
      
      await pyodide.loadPackage("numpy");
      await pyodide.globals.set('matrix', matrix);
      await pyodide.globals.set('size', size);
      
      setPyodideReady(true);

      // Converts script.py to string that is passed into the Pyodide filesystem with the same name
      try {
        console.log("Fetching Python script...");
        const pythonCode = await (await fetch('/Gomoku/python/script.py')).text();
        console.log("Python script fetched successfully");
        pyodide.FS.writeFile('/home/pyodide/script.py', pythonCode);

        console.log("Printing board:");
        const result = await pyodide.runPython('import script; script.print_matrix(matrix)');
        console.log(result);
        setOutput(result);
      } 
      catch (error) {
        console.error("Error loading or running Python script:", error);
        setOutput("Error: " + error.message);
      }
    }
    
    initializePyodide();
  }, []); // Remove dependencies to prevent infinite reloads

  return (
    <>
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
    </>
  );
}

export default Board;
