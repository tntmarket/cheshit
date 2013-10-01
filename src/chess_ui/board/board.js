define([
   'chess_ui/chess_ui',

   'text!./board.html',
   'css!./board',

   'chess_ui/color_utils',
   'chess_ui/piece/piece'
], function(ChessUi, boardTemplate) {

   /**
    * USAGE:
    *  <board on-move="moveHandler(from, to)"
    *    squares="8x8MatrixOfSquares"
    *    playingAs="black or white">
    *
    *  moveHandler is passed:
    *    from - [row, file] of piece source
    *    to - [row, file] of piece destination
    */
   ChessUi.directive('board', function() {
      return {
         restrict: 'E',
         template: boardTemplate,
         replace: true,
         scope: {
            squares: '=',
            playingAs: '@',
            onMove: '&'
         },

         link: function(scope) {
            scope.move = {
               inProgress: false,
               from: [0,0]
            };
         }
      };
   });

   ChessUi.controller('BoardSquare', function($scope, ColorUtils) {
      var move = $scope.move;

      function iOwnThisPiece() {
         return $scope.playingAs === ColorUtils.colorOf($scope.pieceType);
      }

      function iHoldThePiece() {
         return move.inProgress &&
            move.from[0] === $scope.row &&
            move.from[1] === $scope.file;
      }

      $scope.canMoveTo = function() {
         return move.inProgress && !iOwnThisPiece();
      };

      $scope.iOwnThisPiece = iOwnThisPiece;

      $scope.iHoldThePiece = iHoldThePiece;

      $scope.holdOrDropPiece = function(row, file, event) {
         if (iHoldThePiece()) {
            move.inProgress = false;
         } else if(iOwnThisPiece()) {
            move.inProgress = true;
            move.from = [row, file];
            event.stopPropagation();
            // don't drop immediately on your own square!
         }
      };

      $scope.releaseAt = function(row, file) {
         if(move.inProgress && !iOwnThisPiece()) {
            $scope.onMove({
               from: $scope.move.from,
               to: [row, file]
            });
            move.inProgress = false;
         }
      };
   });

});
