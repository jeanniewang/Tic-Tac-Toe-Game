// Emulating "Private" Variables in JavaScript with Closures and Factory Functions

// http://ritzcovan.com/index.php/2019/12/19/using-closure-in-javascript-to-create-private-variables/
// https://dev.to/somedood/emulating-private-variables-in-javascript-with-closures-and-factory-functions-2314

 const Board = (function BoardFunc() {
    let tiles = [...Array(9)];
    let lineChecker = [[0,1,2],[0,4,8],[0,3,6],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
  
    getTiles = function() {
      return tiles;
    }

    placeTile = function(tile, pos) {
      if (pos >= 0) {
        tiles[pos] = tile;
      }
    }

    clearTiles = function() {
      tiles.fill(undefined);
    }
    
    getLineChecker = function() {
      return lineChecker;
    }

    return {
      getTiles: getTiles,
      placeTile: placeTile,
      clearTiles: clearTiles,
      getLineChecker: getLineChecker
    }

}());


module.exports = Board;


  