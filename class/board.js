// Board should be a singleton

class Board {
    static _tiles = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
    static lineChecker = [[0,1,2],[0,4,8],[0,3,6],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
    
    static placeTile(tile, pos){
      if (pos >= 0) {
        this._tiles[pos] = tile;
      }
    }
  
    static get tiles() {
      return this._tiles;
    }

    static clearTiles() {
      this._tiles.fill(undefined);
    }
  }
  
  module.exports = Board;

  