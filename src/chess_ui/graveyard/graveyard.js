define([
   'chess_ui/chess_ui',

   'text!./graveyard.html',
   'css!./graveyard'
], function (ChessUi, graveyardTemplate) {

   ChessUi.directive('graveyard', function () {
      return {
         restrict: 'E',
         template: graveyardTemplate,
         replace: true,
         scope: {
            color: '@'
         },
         link: function (scope, el, attrs) {

         },
         controller: function () {

         }
      };
   });

});

