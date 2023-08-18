import Board from "../components/Board"
import * as consts from "./consts"

// Fill letters bank based on the rules given above
let lettersBank: Letter[] = [];
const initLettersBank = () => {
    consts.rulesDict.forEach(rule => {
        lettersBank = [...lettersBank,
                       ...Array(rule.amount).fill({text: rule.text, value: rule.value})]
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
const initPlayersList = (playersNames: string []) => {
    const playersList: Player[] = playersNames.map((playerName, index) => {
        return {
            id: index,
            name: playerName,
            score: 0,
            letters: getLetters(consts.numLettersPerHand),
        }})
    return playersList
}

const doTurn = () => {
    // TODO - React Koren
    let turn = {x: 5, y: 3, direction: 'Left'}
    return turn
}

const doStep = (board: Tile[], turn: Turn, step: number) => {
    let currentTile = board[turn.x, turn.y]
    let reachLimit = false

    // Do step
    if(turn.direction == 'Horizontal') {
        turn.x += step;
    }
    else if(turn.direction == 'Vertical') {
        turn.y += step;
    }

    // check if turn is valid and if so update currentTile
    if(step > 0) { // backwards in hebrew
        let limit = board.length
        if (turn.x <= limit && turn.y <= limit) {
            currentTile = board[turn.x, turn.y]
        }
        else {
            currentTile = board[turn.x, turn.y]
            reachLimit = true;
        }
    }
    else if (step < 0) { // forward in hebrew
        let limit = 0
        if (turn.x >= limit && turn.y >= limit) {
            currentTile = board[turn.x, turn.y]
        }
        else {
            currentTile = board[turn.x, turn.y]
            reachLimit = true;
        }
    }
    else { // step = 0
        currentTile = board[turn.x, turn.y]
    }

    return [currentTile, reachLimit] as [Tile, boolean]
}

const goToWordStart = (board: Tile[], turn: Turn) => {
    let [currentTile, reachLimit] = doStep(board, turn, 0) // get current tile
    while (!reachLimit && currentTile.letter) {
        [currentTile, reachLimit] = doStep(board, turn, +1) // backwards in hebrew
    }
    return [currentTile, reachLimit] as [Tile, boolean]
}

const calcWordScore = (board: Tile[], turn: Turn) => {
    let factor = 1; // factor for double/triple word tiles
    let score: number = 0
    let [currentTile, reachLimit] = goToWordStart(board, turn)
    while (!reachLimit && currentTile.letter) { 
        // calc score for 'DoubleWord' (type=3) or 'TripleWord' (type=4) tiles
        if(currentTile.type == 3 || currentTile.type == 4) {
            factor = Math.max(factor,currentTile.type - 1);
            score += currentTile.letter.value;
        }
        // calc score for 'Normal' (type=0), 'doubleLetter' (type=1) or 'TripleLetter' (type=2) tiles
        else {
            score += currentTile.letter.value * (currentTile.type + 1)
        }    
        [currentTile, reachLimit] = doStep(board, turn, -1) // step forward in hebrew
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
    let [currentTile, reachLimit] = goToWordStart(board, turn)
    while (!reachLimit && currentTile.letter) {
        if(!currentTile.submitted) {
            turn = flipDirection(turn) // flip to calculate secondary word score
            score += calcWordScore(board, turn)
            turn = flipDirection(turn) // flip again to get back to main word lane
        }
        [currentTile, reachLimit] = doStep(board, turn, -1) // step forward in hebrew
    }
    return score;
}

// submit all letters on board and return numLetters submitted
const submitLetters = (board: Tile[]) => {
    let numLetters = 0
    board.forEach(tile => {
        if(!tile.submitted) {
            tile.submitted = true;
            numLetters++;
         }
    })
    return numLetters;

}
const CalcTurnScore = (board: Tile[], turn: Turn, playersList: Player[], playerId: number) => {
    // calc turn score
    let score:number = 0;
    score = score + calcWordScore(board,turn);
    score = score + calcSecondaryWordsScore(board,turn);

    // Submit letters,update player score and draw new letters
    let numLetters = submitLetters(board)
    if(numLetters == consts.numLettersPerHand) {
        score+= consts.scoreUsingAllWords
    }
    playersList[playerId].score += score
    playersList[playerId].letters.push(...getLetters(numLetters))
}

// init game
const initGame = (playersNames: string[], board: Tile[]) => {   
    // init letters bank and players list
    initLettersBank()
    let playersList = initPlayersList(playersNames)

    // Make game: loop on player turns on board until letters bank is finished
    let playerId = getRandomNumber(0,playersList.length-1)
    while (lettersBank.length >= 0) {
        let turn = doTurn() // with React
        CalcTurnScore(board, turn, playersList, playerId)
        playerId = (playerId + 1) % playersList.length
    }
};

export {initGame, getLetters, doTurn}
