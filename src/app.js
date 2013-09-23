var App = angular.module('cheshit', ['firebase', 'board']);

App.controller('Chess', ['$scope', 'angularFire',
function($scope, angularFire) {
   var ref = new Firebase('https://cheshit.firebaseio.com/game/board');
   angularFire(ref, $scope, 'board');
   ref.set([
      [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
      [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
      [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ]
   ]);

   $scope.player = 'white';

   $scope.$on('move', function(event, from, to) {
      var board = $scope.board;

      board = $scope.board;
      board[to[0]][to[1]] = board[from[0]][from[1]];
      board[from[0]][from[1]] = ' ';
   });
}]);
