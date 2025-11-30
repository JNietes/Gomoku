function ResetButton({
  size,
  setMatrix,
  pyodideReady,
  setGameRunning,
  setCurrentTurn
  }){

  async function handleClick() {
    const newMatrix = Array(size).fill(0).map(() => Array(size).fill(0));
    setMatrix(newMatrix);
    if (window.pyodide && pyodideReady) {
      await pyodide.runPythonAsync('current_board.reset_board()')
    }
    setGameRunning(true);
    setCurrentTurn(-1);
  }

  return (
    <>
      <button className="resetButton"onClick={handleClick}>Reset Board</button>
    </>
  )
}

export default ResetButton;