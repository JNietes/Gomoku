import { useState } from "react";

function Tile({
  index,
  element,
  matrix,
  setMatrix,
  currentTurn,
  setCurrentTurn,
}) {
  const row = index.split(",")[0];
  const col = index.split(",")[1];

  let colorClass = "empty";

  if (element == -1) {
    colorClass = "blackStone";
  }

  if (element == 1) {
    colorClass = "whiteStone";
  }

  function handleClick() {

    if (matrix[row][col] == 0) {
      let copy = Array.from(matrix);
      if (currentTurn == -1) {
        copy[row][col] = -1;
      } else {
        copy[row][col] = 1;
      }
      setMatrix(copy);
    }

    // -1: black; 1: white;
    setCurrentTurn(-currentTurn);
  }

  return <button className={colorClass} onClick={handleClick}></button>;
}

export default Tile;
