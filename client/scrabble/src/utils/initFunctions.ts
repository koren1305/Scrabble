import Board from "../components/Board";

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

let lettersBank: Letter[] = []

// Init letters bank based on the rules given above
const initLettersBank = () => {
    rulesDict.forEach(rule => {
        lettersBank = [...lettersBank, ...Array(rule.amount).fill({text: rule.text, value: rule.value})]
    })
}

// get random number between min and max
const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

 // get letters from letters bank
const getLetters = (numLetters: number) => {
    let letters: Letter[] = []
    for (let i = 0 ; i < numLetters ; i++) {
         // choose random letter
         let randIndex = 0
        if (lettersBank.length > 1) {
            randIndex = getRandomNumber(0,lettersBank.length-1)
        }

        letters[i] = lettersBank.splice(randIndex,1)[0] // get letter from bank
    }
    return letters
}

// init players list and give them letters
const initPlayersList = (playersNames: string [], numLettersPerHand: number) => {
    const playersList: Player[] = playersNames.map((playerName, index) => {
        return {
            id: index,
            name: playerName,
            score: 0,
            letters: getLetters(numLettersPerHand),
        }})
    return playersList
}

const doTurn = () => {
    // TODO - React Koren
    let turn = {x: 5, y: 3, direction: 'Left'}
    return turn
}

const doStep = (turn: Turn, step: number) => {
    if(turn.direction == 'Horizontal') {
        turn.x += step;
    }
    else if(turn.direction == 'Vertical') {
        turn.y += step;
    }
    return turn
}

const goToWordStart = (board: Tile[], turn: Turn) => {
    const limit = 0
    let currentTile: Tile = board[turn.x,turn.y]
    while (currentTile.letter) {
        // step backward on board
        turn = doStep(turn, +1)
        if (turn.x >= limit && turn.y >= limit) {
            currentTile = board[turn.x,turn.y]
        }
        else {
            break;
        }
    }
    return turn
}

const calcWordScore = (board: Tile[], turn: Turn) => {
    let factor = 1;
    let score: number = 0
    const limit = board.length
    turn = goToWordStart(board, turn)
    let currentTile = board[turn.x,turn.y]
    while (currentTile.letter) { 
        // calc score for tile 'DoubleWord' or 'TripleWord'
        if(currentTile.type == 3 || currentTile.type == 4) {
            factor = Math.max(factor,currentTile.type - 1);
            score += currentTile.letter.value;
        }
        // calc score for tile 'Normal', 'doubleLetter' or 'TripleLetter'
        else {
            score += currentTile.letter.value * (currentTile.type + 1)
        }
        // step forward on board   
        turn = doStep(turn, -1)
        if (turn.x <= limit && turn.y <= limit) {
            currentTile = board[turn.x,turn.y]
        }
        else {
            break;
        }
    }
    score *= factor;
    return score
}
const flipDirection = (turn: Turn) => {
    if(turn.direction == 'Horizontal') {
        turn.direction = 'Vertical';
    }
    else if(turn.direction == 'Vertical') {
        turn.direction = 'Horizontal';
    }
    return turn
}

const calcSecondaryWordsScore = (board: Tile[], turn: Turn) => {
    let score:number = 0
    const limit = board.length
    turn = goToWordStart(board, turn)
    let currentTile = board[turn.x,turn.y]  
    while (currentTile.letter) {
        // calc secondary word score
        if(!currentTile.submitted) {
            score += calcWordScore(board,flipDirection(turn))
        }
        // step forward on board
        turn = doStep(turn, -1)
        if (turn.x <= limit && turn.y <= limit) {
            currentTile = board[turn.x,turn.y]
        }
        else {
            break;
        }
    }
    return score;
}

const submitLetters = (board: Tile[]) => {
    let count = 0
    board.forEach(tile => {
        tile.submitted == true;
        count++;
    })
    return count;

}
const CalcTurnScore = (board: Tile[], turn: Turn, playersList: Player[], playerId: number) => {
    // calc turn score
    let score:number = 0;
    score = score + calcWordScore(board,turn);
    score = score + calcSecondaryWordsScore(board,turn);

    // update player score, submit letters and draw new letters
    playersList[playerId].score += score
    let numLetters = submitLetters(board)
    playersList[playerId].letters.push(...getLetters(numLetters))
}

// init letters bank and players list
const initGame = (playersNames: string[], numLettersPerHand: number, board: Tile[]) => {   
    initLettersBank()
    let playersList = initPlayersList(playersNames, numLettersPerHand)

    // loop on player turns on board until bank is finished
    let playerId = getRandomNumber(0,playersList.length-1)
    while (lettersBank.length >= 0) {
        let turn = doTurn() // with React
        CalcTurnScore(board, turn, playersList, playerId)
        playerId = (playerId + 1) % playersList.length
    }
};

export {initGame, getLetters, doTurn}
