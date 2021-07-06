
const Board = require("./board");
const _ = require('lodash');

class Player {
    constructor(name, tilePattern, playerType) {
        this.name = name;
        this.tilePattern = tilePattern;
        this.playerType = playerType;
        this._nextMove = -1;
    }

    // computer player figure out the next move
    // Looking at the board, calculate this._nextMove
    // It'd better be a private function !!!!!
    calculateMove() {
        // To see if I am going to win, looking for [1,1,0], [1,0,1], [0,1,1]
        let nextMove = this.findNextMove([1,1,0], [1,0,1], [0,1,1]);
        if (nextMove >= 0) {
            this._nextMove = nextMove;
            return;
        }

        // If not going to win, to see if I am going to lose, then move to save the game
        // Looking for [0,-1,-1], [-1,0,-1],[-1,-1,0]
        nextMove = this.findNextMove([0,-1,-1], [-1,0,-1],[-1,-1,0]);
        if (nextMove >= 0) {
            this._nextMove = nextMove;
            return;
        }

        // If not going to lose, place one with higher chance to win
        // looking for [0,0,1], [0,1,0],[1,0,0]
        nextMove = this.findNextMove([0,0,1], [0,1,0],[1,0,0]);
        if (nextMove >= 0) {
            this._nextMove = nextMove;
            return;
        }

        nextMove = this.findNextMove([0,0,-1], [0,-1,0],[-1,0,0]);
        if (nextMove >= 0) {
            this._nextMove = nextMove;
            return;
        }

        nextMove = this.findNextMove([0,0,0]);
        if (nextMove >= 0) {
            this._nextMove = nextMove;
            return;
        }
        
        // then the first one in the pattern, and find out the postion then set to nextMove
        nextMove = this.findNextMove([1,-1,0],[-1,1,0],[1,0,-1],[-1,0,1],[0,1,-1],[0,-1,1]);
        if (nextMove >= 0) {
            this._nextMove = nextMove;
            return;
        }

        this._nextMove = -1;
    }

    findNextMove(...arr) {
        const lineChecker = Board.lineChecker;
        const patterns = this.generatePatterns();
        let index = patterns.findIndex((i) => (arr.find(a => _.isEqual(i, a)) !== undefined ));
        if (index >= 0) {
            const j = patterns[index].findIndex((i) => i === 0);
            return lineChecker[index][j];
        }
    }

    generatePatterns() {
        const board = Board.tiles;
        const lineChecker = Board.lineChecker;
        let result = [];
        for (let i = 0; i < lineChecker.length; i++) {
            const el = lineChecker[i];
            let pattern = [];
            for (let j = 0; j < 3; j ++) {
                if (board[el[j]] === undefined) {
                    pattern.push(0);
                } else if (board[el[j]].tilePattern === this.tilePattern) {
                    pattern.push(1);
                } else {
                    pattern.push(-1);
                }
            }
            result.push(pattern);
        }
        return result;
    }

    get nextMove() {
        if (this.playerType == "COMPUTER") {
            this.calculateMove();
        }
        return this._nextMove;
    }

    set nextMove(value) {
        this._nextMove = value;
    }

} 

module.exports = Player;
  