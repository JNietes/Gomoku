function ToggleBestMoveButton({
  generatingRandMoves,
  generatingSuccMoves,
  setGeneratingSuccMoves
}){

  const handleClick = () => {
    if (generatingRandMoves == false) {
      setGeneratingSuccMoves(!generatingSuccMoves);
    }
  };

  return (
    <button 
      className={`toggle-button ${generatingSuccMoves ? 'active' : ''}`}
      onClick={handleClick}
    >    
      Opponent Best Move
    </button>
  )
}

export default ToggleBestMoveButton;