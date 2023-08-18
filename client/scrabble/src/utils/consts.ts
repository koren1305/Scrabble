// Rules for the game: what is the value and amount of each letter 
const rulesDict = [
    {text: 'א', value: 3, amount: 3},
    {text: 'ב', value: 3, amount: 4},
    {text: 'ג', value: 8, amount: 1},
    {text: 'ד', value: 3, amount: 4},
    {text: 'ה', value: 1, amount: 9},
    {text: 'ו', value: 1, amount: 12},
    {text: 'ז', value: 8, amount: 1},
    {text: 'ח', value: 5, amount: 2},
    {text: 'ט', value: 8, amount: 1},
    {text: 'י', value: 1, amount: 10},
    {text: 'כ', value: 5, amount: 2},
    {text: 'ל', value: 2, amount: 6},
    {text: 'מ', value: 2, amount: 6},
    {text: 'נ', value: 4, amount: 3},
    {text: 'ס', value: 8, amount: 1},
    {text: 'ע', value: 5, amount: 2},
    {text: 'פ', value: 4, amount: 3},
    {text: 'צ', value: 8, amount: 1},
    {text: 'ק', value: 5, amount: 2},
    {text: 'ר', value: 1, amount: 8},
    {text: 'ש', value: 2, amount: 6},
    {text: 'ת', value: 1, amount: 8},
  ];

// init values
let lettersBank: Letter[] = [];
const numLettersPerHand: number = 7;
const scoreUsingAllWords: number = 50;