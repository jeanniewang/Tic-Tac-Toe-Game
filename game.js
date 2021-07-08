const readline = require('readline');
const Player = require('./class/player');
const PlayerType = require("./enum/playerType");
const Tile = require('./class/tile');
const TilePattern = require('./enum/tilePattern');
const Board = require('./class/board');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let computerPlayer;
let humanPlayer;
let tie = 0;
let computerWin = 0;
let humanWin = 0;
let winner = undefined;

function startGame() {
  console.clear();
  console.log("Welcome to Tic Tac Toe!\n");

  rl.question('Please enter your name: ', (name) => {
    console.clear();
    console.log(`Hello, ${name}!\n`);

    // initiate the game and player
    computerPlayer = new Player("computer", TilePattern.CROSS, PlayerType.COMPUTER);
    humanPlayer = new Player(name, TilePattern.STONE, PlayerType.HUMAN);
    
    rl.question('\nHit RETURN to start your adventure\n', () => {

      console.clear();
      console.log(`The computer tile is ${TilePattern.CROSS}, yours tile is ${TilePattern.STONE}`);

      processCommand();
    });
  });
}

function processCommand() {
  printBoard();
  printInstruction();
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'q') {
      rl.close();
      process.exit();
    }

    playerMove(cmd);
    
    playerMove();
    
    processCommand();
  });
}

function playerMove(pos) {
  let tile;
  let p;
  if (pos) {
    // human player
    humanPlayer.nextMove = pos;
    p = humanPlayer.nextMove;
    console.log(TilePattern.STONE);
    tile = new Tile(TilePattern.STONE, PlayerType.HUMAN)
  } else {
    // computer player
    p = computerPlayer.nextMove;
    console.log(TilePattern.CROSS);
    tile = new Tile(TilePattern.CROSS, PlayerType.COMPUTER);
  }
  
  // then place the tile for this player
  placeTile(tile, p);

  win = check();
  if (winner != undefined) {
    count();
    if (winner == PlayerType.COMPUTER) {
      console.log(`${computerPlayer.name} win !!!`)
    } else if (winner == PlayerType.HUMAN) {
      console.log(`${humanPlayer.name} win !!!`)
    } else {
      console.log("TIE !!!")
    }
    printBoard();
    printResult();
    restart();
  }
}


function restart() {
  // clean the board
  Board.clearTiles();
  console.log(`New game start !!! `);
  winner = undefined;
}

function check() {
  const board = Board.tiles;
  const lineChecker = Board.lineChecker;
  let i;
  for (i = 0; i < lineChecker.length; i ++) {
    el = lineChecker[i];
    if (board[el[0]] && board[el[1]] && board[el[2]]) {
      if(board[el[0]].tilePattern === TilePattern.CROSS && board[el[1]].tilePattern === TilePattern.CROSS && board[el[2]].tilePattern === TilePattern.CROSS){
        winner = PlayerType.COMPUTER;
        break;
      } else if (board[el[0]].tilePattern === TilePattern.STONE && board[el[1]].tilePattern === TilePattern.STONE && board[el[2]].tilePattern === TilePattern.STONE) {
        winner = PlayerType.HUMAN;
      } else if (i === lineChecker.length - 1) {
        winner = "TIE"
      }
    }
  }
}

function count() {
  if (winner === PlayerType.COMPUTER) {
    computerWin ++;
  } 

  if (winner === PlayerType.HUMAN) {
    humanWin ++;
  }

  if (winner === "TIE") {
    tie ++;
  }
}

function placeTile(tile, pos) {
  Board.placeTile(tile, pos);
}

function printInstruction() {
  for (let i = 0; i < 3; i ++) {
    let row = [];
    for (let j = 0; j < 3; j ++) {
      row.push(i*3 + j);
    }
    console.log(row);
  }
  console.log("Type in the tile number if you want to place your tile there !!!")
  console.log();
}

function printBoard() {
  console.log("Current situation:")
  const board = Board.tiles;
  const root = 3;
  for (let i = 0; i < 3; i ++) {
    let row = [];
    for (let j = 0; j < root; j ++) {
      const tile = board[i * root + j];
      if (tile) {
        if (tile.tilePattern == TilePattern.STONE) {
          row.push('O');
        } else {
          row.push('x');
        }
      } else {
        row.push(' ');
      }
    }
    console.log(row);
  }
  console.log();
}

function printResult() {
  console.log("tie - computer win - human win");
  console.log(`${tie} - ${computerWin} - ${humanWin}`);
}


startGame();