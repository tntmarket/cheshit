define([
   'chess_ui/chess_ui',

   'css!./piece'
], function(ChessUi) {

   ChessUi.directive('piece', function() {
      //noinspection JSUnusedGlobalSymbols
      return {
         restrict: 'E',
         template:
            '<div class="piece piece-{{type}}" ng-hide="type == \' \'">' +
            '</div>',
         replace: true,
         scope: true,
         link: function(scope, el, attrs) {
            attrs.$observe('type', function(value) {
               scope.type = value;
            });
         }
      };
   });

});
