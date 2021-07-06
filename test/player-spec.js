const Board = require("../class/board");
const Tile = require("../class/tile");
const Player = require("../class/player");

describe ('Character', function () {
    let computerPlayer;
    beforeEach(function() {
        // Board.placeTile(new Tile("cross","COMPUTER"), 0);
        Board.placeTile(new Tile("stone","HUMAN"), 3);
        // Board.placeTile(new Tile("stone","HUMAN"),4);
        computerPlayer = new Player("computer", "cross", "COMPUTER");
    });

    // it('it should generate the correct Pattern for a board tiles', function () {
    //     const result = computerPlayer.generatePatterns();
    //     console.log(result);
    // });

    it('it should find the next move', function () {
        const nextMove = computerPlayer.findNextMove([0,0,0]);
        console.log(nextMove);
    });
})