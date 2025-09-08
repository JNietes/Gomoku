function Tile({
  index,
  size,
  element,
  matrix,
  setMatrix,
  currentTurn,
  setCurrentTurn,
  winMat,
}) {
  const row = index.split(",")[0];
  const col = index.split(",")[1];

  let colorClass = "";
  let currentColor = "";

  if (currentTurn == -1) {
    colorClass = "blackTurn";
    currentColor = "Black";
  }

  if (currentTurn == 1) {
    colorClass = "whiteTurn";
    currentColor = "White";
  }

  if (currentTurn == 0) {
    colorClass = "deadTile"; // Dead, as in not animated
  }

  if (element == -1) {
    colorClass = "blackStone";
  }

  if (element == 1) {
    colorClass = "whiteStone";
  }

  function newIndexInside(index, delta, size) {
    let inside = false;
    let newIndex = parseInt(index) + parseInt(delta);
    if (newIndex >= 0 && newIndex < size) {
      inside = true;
    }
    return inside;
  }

  function handleClick() {
    if (currentTurn != 0) {
      if (matrix[row][col] == 0) {
        let copy = Array.from(matrix);
        if (currentTurn == -1) {
          copy[row][col] = -1;
        } else {
          copy[row][col] = 1;
        }
        setMatrix(copy);
      }

      // Detect matching stones in 4 star raduis.
      let matchingStones = 0;
      for (let i = 0; i < winMat.length; i++) {
        matchingStones = 0;
        for (let j = 0; j < winMat[0].length; j++) {
          let rowDelta = winMat[i][j][0];
          let colDelta = winMat[i][j][1];
          let rowPlusDelta = parseInt(row) + parseInt(rowDelta);
          let colPlusDelta = parseInt(col) + parseInt(colDelta);

          if (
            newIndexInside(row, rowDelta, size) &&
            newIndexInside(col, colDelta, size)
          ) {

            if (matrix[rowPlusDelta][colPlusDelta] == currentTurn) {
              matchingStones++;
              if (i==1)
                console.log(matchingStones + " Forwardslash");
            }

            // Checks #/8 contiguous tiles then sets count 0
            else {
              matchingStones = 0;
            }

            if (matchingStones >= 4) {
                console.log(currentColor + " won!");
                currentTurn = 0;
                setCurrentTurn(currentTurn);
              }
          }
        }  
      }

      // -1: black; 1: white;
      setCurrentTurn(-currentTurn);
    }
  }

  return <button className={colorClass} onClick={handleClick}></button>;
}

export default Tile;
