import Tile from "./Tile";

function Board() {
  const size = 13;

  // Initializing empty board: 0: empty; 1: white; -1: black;
  const board = Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));
  console.log(board);

  return (
    <>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="newRow">
          {row.map((_, colIndex) => (
              <Tile key={(rowIndex + ',' + colIndex)} />
          ))}
        </div>
      ))}
    </>
  );
}

export default Board;
