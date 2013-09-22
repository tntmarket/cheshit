var App = angular.module('cheshit', [/*'firebase',*/ 'dragdrop']);

App.controller('Chess', ['$scope', /*'angularFire',*/
function($scope, angularFire) {
   //var ref = new Firebase('https://cheshit.firebaseio.com/');
   $scope.game = {
      board: [
         [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ],
         [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
         [ ' ', ' ', ' ', ' ', ' ', ' ', 'K', ' ' ],
         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
         [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
         [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
         [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ]
      ],
      backup: [ 'P', 'P', 'R' ]
   };

   $scope.$on('move', function(event, from, to) {
      //console.log(arguments);
      var board = $scope.game.board;

      $scope.$apply(function() {
         board[to[0]][to[1]] = board[from[0]][from[1]];
         board[from[0]][from[1]] = ' ';
      });
   });

   window.pg = function() {
      console.log($scope.game.board);
   };

   //angularFire(ref, $scope, 'squares');
}]);
