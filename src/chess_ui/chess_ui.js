define([
   './color_utils',
   './board/board',
   './piece/piece',
   './graveyard/graveyard'
], function(InitColorUtils, InitBoard, InitPiece, InitGraveyard) {
   var ChessUi = angular.module('ChessUi', []);

   InitColorUtils(ChessUi);
   InitBoard(ChessUi);
   InitPiece(ChessUi);
   InitGraveyard(ChessUi);
});
