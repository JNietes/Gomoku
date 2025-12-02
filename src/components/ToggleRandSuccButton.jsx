function ToggleRandSuccButton({
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
      Opponent Adjacent Move
    </button>
  )
}

export default ToggleRandSuccButton;