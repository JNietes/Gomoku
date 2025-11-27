

function ToggleMoveGenerator({
  generatingMoves,
  setGeneratingMoves
}){

  const handleClick = () => {
    setGeneratingMoves(!generatingMoves);
  };

  return (
    <button 
      className={`toggle-button ${generatingMoves ? 'active' : ''}`}
      onClick={handleClick}
    >    
      Generating Moves
    </button>
  )
}

export default ToggleMoveGenerator;