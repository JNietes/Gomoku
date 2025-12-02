function ToggleRandMovesButton({
  generatingRandMoves,
  generatingSuccMoves,
  setGeneratingRandMoves
}){

  const handleClick = () => {
    if (generatingSuccMoves == false) {
      setGeneratingRandMoves(!generatingRandMoves);
    }
  };

  return (
    <button 
      className={`toggle-button ${generatingRandMoves ? 'active' : ''}`}
      onClick={handleClick}
    >    
      Opponent Random Move
    </button>
  )
}

export default ToggleRandMovesButton;