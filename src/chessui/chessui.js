define([
   './utils',
   './board/board',
   './piece/piece'
], function(InitUtils, InitBoard, InitPiece) {
   var ChessUi = angular.module('chessui', []);

   InitUtils(ChessUi);
   InitBoard(ChessUi);
   InitPiece(ChessUi);
});
