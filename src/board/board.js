(function() {
   var module = angular.module('dragdrop', []);

   module.service('hand', function() {
      this.from = null;

      this.pickup = function(from) {
         if(this.from) {
            return;
         }

         this.from = from; 
      };

      this.putdown = function() {
         var from = this.from;
         this.from = null;

         return from;
      };
   });
   
   module.directive('piece', function($rootScope) {
      return {
         restrict: 'E',
         templateUrl: 'board/piece.html',
         replace: true,
         scope: {
            type: '@'
         },

         link: function(scope, el, attrs, controller) {
            $(el).draggable({
               addClasses: false,
               revert: false 
            });
         }
      };
   });
   
   module.directive('square', function($rootScope, hand) {

      return {
         restrict: 'E',
         templateUrl: 'board/square.html',
         replace: true,
         scope: {
           row : '@',
           file: '@',
           piece: '@'
         },
         transclude: true,

         link: function(scope, el, attrs, controller) {
            $(el).droppable({
               addClasses: false,
               tolerance: 'pointer',
               out: function(event) {
                  hand.pickup([scope.row, scope.file]);
               },
               drop: function(event) {
                  var from = hand.putdown();
                  var to = [scope.row, scope.file];

                  if(!from || !to) {
                     throw 'FUUUUK';
                  }
                  
                  //console.log('drop: ' + from + ' -> ' + to); 
                  if(from[0] === to[0] && from[1] === to[1]) {
                     return;
                  }

                  scope.$emit('move', from, to);
               },
            });
         }
      };
   });

})();
