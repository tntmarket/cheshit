var App = angular.module('cheshit', [/*'firebase',*/ 'board']);

App.controller('Chess', ['$scope', /*'angularFire',*/
function($scope, angularFire) {
   //var ref = new Firebase('https://cheshit.firebaseio.com/');
   $scope.game = {
      board: [
         [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
         [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
         [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
         [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ]
      ],
      backup: [ 'P', 'P', 'R' ]
   };

   $scope.$on('move', function(event, from, to) {
      console.log(arguments);
      var board = $scope.game.board;


      $scope.$apply(function() {
         board = $scope.game.board;
         board[to[0]][to[1]] = board[from[0]][from[1]];
         board[from[0]][from[1]] = ' ';
         console.log(from, to);
         console.log($scope.game.board.join('\n'));
         //makeMove(from, to, $scope.game);
      });


   });

   window.pg = function() {
      console.log($scope.game.board);
   };

   //angularFire(ref, $scope, 'squares');
}]);
