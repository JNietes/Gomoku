import Tile from "./Tile";

function Board() {
  const size = 13;

  return (
    <>
      {Array.from({ length: size }, (_) => (
        <div class="rowOfTiles">
          {Array.from({ length: size }, (_, index) => (
            <Tile key={index} />
          ))}
        </div>
      ))}
    </>
  );
}

export default Board;
