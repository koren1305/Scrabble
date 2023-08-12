enum TileType {
  Normal,
  DoubleLetter,
  TripleLetter,
  DoubleWord,
  TripleWord,
}

declare interface Letter {
  text: string;
  value: number;
}

declare interface Tile {
  type: TileType;
  letter?: Letter;
}

declare interface Player {
  id: number;
  name: string;
  score: number;
  letters: string[];
}
