define([
   'text!./graveyard.html',
   'css!./graveyard'
], function (graveyardTemplate) {

   function Init(module) {
      module.directive('graveyard', function () {
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
   }

   return Init;
});

