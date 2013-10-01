define([
   'chess_ui/chess_ui'
],
function(ChessUi){

   ChessUi.service('ColorUtils', function() {

      this.colorOf = function(pieceType) {
         if(pieceType === ' ') {
            return false;
         } else if(pieceType.toUpperCase() === pieceType) {
            return 'white';
         } else {
            return 'black';
         }
      };

      this.opposite = function(color) {
         if(color === 'white') {
            return 'black';
         } else if(color === 'black') {
            return 'white';
         } else {
            throw (color + "isn't a color, noob");
         }
      };

   });

});
