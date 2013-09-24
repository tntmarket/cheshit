ChessUi.service('utils', function() {
   this.color = function(pieceType) {
      if(pieceType === ' ') {
         return false;
      } else if(pieceType.toUpperCase()) {
         return 'white';
      } else {
         return 'black';
      }
   }
});

/**
 * USAGE:
 *  <board on-move="moveHandler"
 *    squares="8x8MatrixOfSquares"
 *    player="black or white">
 *
 *  moveHandler is passed:
 *    from - [row, file] of piece source
 *    to - [row, file] of piece destination
 */
ChessUi.directive('board', function() {

   return {
      restrict: 'E',
      templateUrl: 'chessui/board/board.html',
      replace: true,
      scope: {
         squares: '=',
         player: '@',
         onMove: '&'
      },

      controller: function($scope) {
         $scope.move = {
            inProgress: false,
            from: [0,0]
         };
      }
   };
});

ChessUi.controller('BoardSquare', function($scope, utils) {

   $scope.isGrasped = function() {
      var move = $scope.move;
      return move.inProgress &&
             move.from[0] === $scope.row &&
             move.from[1] === $scope.file;
   };

   $scope.ownedByPlayer = function() {
      return $scope.player === utils.color($scope.pieceType);
   };

   $scope.graspAt = function(row, file) {
      $scope.move.inProgress = true;
      $scope.move.from = [row, file];
   };

   $scope.releaseAt = function(row, file) {
      if($scope.move.inProgress && !$scope.ownedByPlayer()) {
         $scope.onMove({
            from: $scope.move.from,
            to: [row, file]
         });
         $scope.move.inProgress = false;
      }
   };
});
