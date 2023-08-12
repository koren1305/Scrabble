import "./Board.scss";
import defaultBoard from "../defaults/defaultBoard";
import { useState } from "react";

const Board = () => {
  const [board, setBoard] = useState<Tile[]>(defaultBoard);

  const tiles = board.map((tile: Tile) => {
    return (
      <div className={`scrabble-board-tile scrabble-board-tile-${tile.type} `}>
        {tile.letter ? <h2>{tile.letter.text}</h2> : null}
      </div>
    );
  });
  return (
    <div className="scrabble-board">
      <div className="scrabble-board-grid">{tiles}</div>
    </div>
  );
};

export default Board;
