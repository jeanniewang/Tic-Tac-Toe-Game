const readline = require('readline');
const Player = require('./class/player')
const Tile = require('./class/tile');
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
    computerPlayer = new Player("computer", "cross", "COMPUTER");
    humanPlayer = new Player(name, "stone", "HUMAN");
    
    rl.question('\nHit RETURN to start your adventure\n', () => {

      console.clear();
      console.log("The computer tile is cross, yours tile is stone");

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
    tile = new Tile("stone", "HUMAN")
  } else {
    // computer player
    p = computerPlayer.nextMove;
    tile = new Tile("cross", "COMPUTER");
  }
  
  // then place the tile for this player
  placeTile(tile, p);

  win = check();
  if (winner != undefined) {
    count();
    if (winner == "COMPUTER") {
      console.log(`${computerPlayer.name} win !!!`)
    } else if (winner == "HUMAN") {
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
      if(board[el[0]].tilePattern === "cross" && board[el[1]].tilePattern === "cross" && board[el[2]].tilePattern === "cross"){
        winner = "COMPUTER";
        break;
      } else if (board[el[0]].tilePattern === "stone" && board[el[1]].tilePattern === "stone" && board[el[2]].tilePattern === "stone") {
        winner = "HUMAN";
      } else if (i === lineChecker.length - 1) {
        winner = "TIE"
      }
    }
  }
}

function count() {
  if (winner === "COMPUTER") {
    computerWin ++;
  } 

  if (winner === "HUMAN") {
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
        if (tile.tilePattern == "stone") {
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