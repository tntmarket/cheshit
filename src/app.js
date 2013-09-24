require.config({
   paths: {
      'angular': 'lib/angular-latest/build/angular',
      'firebase': 'lib/firebase-debug',
      'angularFire': 'lib/angular-fire/angularFire'
   },
   map: {
      '*': {
         'css': 'lib/require-css/css',
         'text': 'lib/text/text'
      }
   },
   shim: {
      'angular': {
         exports: 'angular'
      },
      'firebase': {
         exports: 'firebase'
      },
      'angularFire': {
         deps: ['firebase', 'angular']
      }
   }
});

require([
   'css!style',

   'angular',
   'firebase',
   'angularFire',

   'chess_ui/chess_ui'

], function() {

   var App = angular.module('cheshit', ['firebase', 'ChessUi']);

   App.controller('Chess', function($scope, angularFire) {
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

      $scope.whiteOrBlack = 'white';

      $scope.handleMove = function(from, to) {
         var board = $scope.board;

         board[to[0]][to[1]] = board[from[0]][from[1]];
         board[from[0]][from[1]] = ' ';
      }
   });

   angular.bootstrap(document.body, ['cheshit'])

});
