function TurnIndicator({
  currentTurn,
  pyodideReady
  }){

  let turnString = "";

  if (!pyodideReady) {
    turnString = "Pyodide Loading"
  }
  else {
    if (currentTurn == -1) {
    turnString = "Black's Turn"
    }
    else if (currentTurn == 1) {
      turnString = "White's Turn"
    }
    else if (currentTurn == 0) {
      turnString = "Game Finished"
    }
  }
  
  return (
    <>
      <h1>{turnString}</h1>
    </>
  )
}

export default TurnIndicator;