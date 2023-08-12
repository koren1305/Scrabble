declare interface Turn {
  x: number
  y: number
  direction: string
}

enum TileType {
  Normal = 1,
  DoubleLetter = 2,
  TripleLetter = 3,
  DoubleWord = 4,
  TripleWord = 5,
}

declare interface Letter {
  text: string;
  value: number;
}

declare interface Tile {
  x: number
  y: number
  type: TileType;
  letter: Letter;
  submitted: boolean;
}

declare interface Player {
  id: number;
  name: string;
  score: number;
  letters: Letter[];
}
