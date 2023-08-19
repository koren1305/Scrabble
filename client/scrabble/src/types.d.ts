declare interface Turn {
  x: number
  y: number
  direction: string
}

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
  submitted: boolean;
}

declare interface Player {
  id: number;
  name: string;
  score: number;
  letters: Letter[];
}
