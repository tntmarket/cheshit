define([
   'chess_ui/chess_ui',

   'text!./board.html',
   'css!./board',

   'chess_ui/color_utils',
   'chess_ui/piece/piece'
],

function(ChessUi, boardTemplate) {

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
         }
      };
   });

   ChessUi.service('BoardMove', function() {
      var inProgress = false;
      var from = [0,0];

      this.start = function(row, file) {
         inProgress = true;
         from = [row, file];
      };

      this.startedFrom = function(row, file) {
         return inProgress &&
            from[0] === row &&
            from[1] === file;
      };

      this.cancel = function() {
         inProgress = false;
      };

      this.inProgress = function() {
         return inProgress;
      };

      this.end = function(row, file) {
         inProgress = false;
         return {
            from: from,
            to: [row, file]
         };
      };
   });

   ChessUi.controller('BoardSquareCtrl', function($scope, ColorUtils, BoardMove) {
      var row, file;

      $scope.setRowAndFile = function(_row, _file) {
         row = _row;
         file = _file;
      };

      function iOwnThisPiece() {
         return $scope.playingAs === ColorUtils.colorOf($scope.pieceType);
      }

      function iHoldThisPiece() {
         return BoardMove.startedFrom(row, file);
      }

      function canMoveHere() {
         return BoardMove.inProgress() && !iOwnThisPiece();
      }

      $scope.squareClass = function() {
         return [
            iHoldThisPiece() ? 'square-selected' : 'square',
            canMoveHere() ? 'fist-cursor' : ''
         ];
      };

      $scope.pieceClass = function() {
         if(canMoveHere()) {
            return 'crosshair-cursor';
         } else if(iOwnThisPiece()) {
            if(iHoldThisPiece()) {
               return 'fist-cursor';
            } else {
               return 'finger-cursor';
            }
         }
         return '';
      };

      $scope.startOrEndMove = function() {
         if (iHoldThisPiece()) {
            BoardMove.cancel();
         } else if(iOwnThisPiece()) {
            BoardMove.start(row, file);
         } else if(canMoveHere()) {
            $scope.onMove(BoardMove.end(row, file));
         }
      };
   });

});
