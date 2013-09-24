ChessUi.directive('piece', function() {
   return {
      restrict: 'E',
      //can't use templateUrl: https://github.com/angular/angular.js/issues/1941
      template: '<div class="piece piece-{{type}}" ng-hide="type == \' \'"></div>',
      replace: true,
      scope: true,
      link: function(scope, el, attrs) {
         attrs.$observe('type', function(value) {
            scope.type = value;
         });
      }
   };
});
