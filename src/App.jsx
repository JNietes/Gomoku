import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <div>
        <h1>Gomoku Board:</h1>
        <Board />
      </div>
    </>
    
  )
}

function Board() {
  contst [count, setCount] = useState(0);

  function handleclick() {
    setCount(count + 1)
  }

  return (
    <div className="board-row">
      <Tile count={count} onClick={handleclick}/>
    </div> 

  );
}

function Tile({ count, onClick }) {

  return (
    <button className="tile" onClick={onClick}>
      {count}
    </button>
  );
}
export default App
