import {useState, useEffect} from "react";
import {Board, TurnIndicator} from "./components";
import { loadPyodide } from 'pyodide';
import "./App.css";

function App() {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [size, setSize] = useState(13);
  const [pyodideReady, setPyodideReady] = useState(false);

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
      
      window.pyodide = pyodide;
      
      await pyodide.loadPackage("numpy");
      await pyodide.globals.set('matrix', matrix);
      await pyodide.globals.set('size', size);

      const base = import.meta.env.BASE_URL || '/';
      const scriptUrl = `${base}python/script.py`; // if you placed it at public/python/script.py
      const resp = await fetch(scriptUrl);
      if (!resp.ok) throw new Error(`Failed to fetch ${scriptUrl}: ${resp.status}`);
      const pythonCode = await resp.text();
      pyodide.FS.writeFile('/home/pyodide/script.py', pythonCode);
      
      console.log("pyodide ready");
      setPyodideReady(true);
      setCurrentTurn(-1); // Enable tile CSS tile animations after loading pyodide
    }
    
    initializePyodide();
  }, []); // Remove dependencies to prevent infinite reloads

  return (
    <>
      <h1>Gomoku Board</h1>
      <TurnIndicator currentTurn={currentTurn} pyodideReady={pyodideReady}/>
      <Board 
        currentTurn={currentTurn} 
        setCurrentTurn={setCurrentTurn}
        size={size}
        matrix={matrix}
        setMatrix={setMatrix}
        pyodideReady={pyodideReady}
        />
    </>
  );
}

export default App;
