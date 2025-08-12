import { useState } from 'react'
import './App.css'
import Board from './components/Board.jsx'

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

export default App
