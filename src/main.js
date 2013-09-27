require.config({
   paths: {
      angular: 'lib/angular',
      firebase: 'lib/firebase-debug',
      angularFire: 'lib/angular-fire',
      fire: 'fire/fire',
      text: 'lib/text'
   },
   map: {
      '*': {
         css: 'lib/require-css/css'
      }
   },
   shim: {
      angular: {
         exports: 'angular'
      },
      firebase: {
         exports: 'firebase'
      },
      angularFire: {
         deps: ['firebase', 'angular']
      }
   }
});

require([
   'css!style',

   'angular',

   'fire',
   'chess_ui/chess_ui'

], function() {

   var App = angular.module('cheshit', ['Fire', 'ChessUi']);

   App.controller('Chess', function($scope, Sync, ColorUtils) {
      var boardRef = Sync($scope, 'board', '/board');

      boardRef.once('value', function(squares) {
         if(!squares.val()) {
            boardRef.set([
               [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
               [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
               [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
               [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
               [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
               [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
               [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
               [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ]
            ]);
         }
      });

      $scope.myColor = 'white';

      $scope.enemyColor = function() {
         return ColorUtils.opposite($scope.myColor);
      };

      $scope.handleMove = function(from, to) {
         var board = $scope.board;

         board[to[0]][to[1]] = board[from[0]][from[1]];
         board[from[0]][from[1]] = ' ';
      };
   });

   angular.bootstrap(document.body, ['cheshit']);

});
