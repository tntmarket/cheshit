(function() {
   var Board = angular.module('board', []);

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
   Board.directive('board', function() {

      return {
         restrict: 'E',
         templateUrl: 'board/board.html',
         replace: true,
         scope: {
            squares: '=',
            player: '@',
            onMove: '&'
         },

         controller: function($scope) {
            function color(piece) {
               if(piece.toUpperCase() === piece) {
                  return 'white';
               } else {
                  return 'black';
               }
            }

            function isOwner(row, file) {
               var piece = $scope.squares[row][file];
               return piece === ' ' || $scope.player === color(piece);
            }

            function isEmpty(row, file) {
               var piece = $scope.squares[row][file];
               return piece === ' ';
            }

            function notAllied(row, file) {
               return isEmpty(row, file) || !isOwner(row, file);
            }

            $scope.from = null;

            $scope.pickup = function(row, file, event) {
               if(isOwner(row, file)) {
                  $scope.from = [row, file];
                  event.stopPropagation();
               }
            };

            $scope.place = function(row, file) {
               if($scope.from && notAllied(row, file)) {
                  $scope.onMove({
                     from: $scope.from,
                     to: [row, file]
                  });
                  $scope.from = null;
               }
            };

            $scope.isSelected = function(row, file) {
               if($scope.from && isOwner(row, file)) {
                  return (row === $scope.from[0] && file === $scope.from[1]);
               }
               return false;
            };
         }
      };
   });

})();
