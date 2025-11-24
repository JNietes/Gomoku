import {useState, useEffect} from "react";
import {Board, TurnIndicator, ResetButton} from "./components";
import { loadPyodide } from 'pyodide';
import "./App.css";

function App() {
  const [gameRunning, setGameRunning] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [size, setSize] = useState(15);
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

      const base = import.meta.env.BASE_URL || '/';
      const scriptUrl = `${base}python/script.py`; // if you placed it at public/python/script.py
      const resp = await fetch(scriptUrl);

      if (!resp.ok) throw new Error(`Failed to fetch ${scriptUrl}: ${resp.status}`);
        const pythonCode = await resp.text();
      
      pyodide.FS.writeFile('/home/pyodide/script.py', pythonCode); // Adding script.py to pyodide file system

      await pyodide.loadPackage("numpy");
      await pyodide.globals.set('matrix', matrix);
      await pyodide.globals.set('size', size);
      await pyodide.runPythonAsync('import script');
      
      console.log("pyodide ready");
      setPyodideReady(true);
      setGameRunning(true);
      setCurrentTurn(-1); // Enable tile CSS tile animations after loading pyodide
    }
    
    initializePyodide();
  }, []); // Remove dependencies to prevent infinite reloads

  return (
    <>
      <h1 className="title">Gomoku Board</h1>
      <div className="boardContainer"> 
        <TurnIndicator 
          currentTurn={currentTurn} 
          pyodideReady={pyodideReady} 
          gameRunning={gameRunning}/>
        <ResetButton 
          size={size} 
          setMatrix={setMatrix} 
          pyodideReady={pyodideReady} 
          gameRunning={gameRunning} 
          setGameRunning={setGameRunning} 
          setCurrentTurn={setCurrentTurn}/>
        <Board 
          currentTurn={currentTurn} 
          setCurrentTurn={setCurrentTurn}
          size={size}
          matrix={matrix}
          setMatrix={setMatrix}
          pyodideReady={pyodideReady}
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          />
      </div>
      
    </>
  );
}

export default App;
