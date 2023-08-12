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

 // get letters from letters bank
const getLetters = (lettersBank: any[], numLetters: number) => {
    let letters: string[] = []
    for (let i = 0 ; i < numLetters ; i++) {
        let randIndex = Math.floor(Math.random() * (lettersBank.length + 1))
        letters[i] = lettersBank.splice(randIndex,1)[0]
    }
    return letters
}

// Init players and give each one letters
const initGame = (playersNames: string[], numLettersPerHand: number) => {   
    // Init letters bank based on the rules given above
    let lettersBank: Letter[] = []
    rulesDict.forEach(rule => {
        lettersBank = [...lettersBank, ...Array(rule.amount).fill({text: rule.text, value: rule.value})]
    })

    // init players list and give them letters
    const playersList: Player[] = playersNames.map((playerName, index) => {
        return {
            id: index,
            name: playerName,
            score: 0,
            letters: getLetters(lettersBank, numLettersPerHand),
        }})
    return playersList
};

export {getLetters, initGame}
const doTurn
