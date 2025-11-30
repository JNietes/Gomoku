function TurnIndicator({
  currentTurn,
  pyodideReady,
  gameRunning
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
  }

  if (!gameRunning) {
    if (currentTurn == -1) {
      turnString = "Black Won!"
    }
    else if (currentTurn == 1) {
      turnString = "White Won!"
    }
  }
  
  return (
    <>
      <h1 className="turnIndicator">{turnString}</h1>
    </>
  )
}

export default TurnIndicator;