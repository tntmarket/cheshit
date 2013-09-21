var App = angular.module('cheshit', ['firebase', 'dragdrop']);

App.controller('Chess', ['$scope', 'angularFire',
function($scope, angularFire) {
   var ref = new Firebase('https://cheshit.firebaseio.com/');
   $scope.thing = {
      cray: [
         [1,2,3],
         [2,3,4]
      ]
   };
   $scope.game = {
      board: [
          [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ],
          [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
          [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
          [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
          [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
          [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
          [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
          [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ]
      ],
      backup: [ 'P', 'P', 'R' ]
   };

   $scope.gogo = function(piece) {
      console.log('asdf');
      console.log(piece);
   };
   //angularFire(ref, $scope, 'squares');
}]);
