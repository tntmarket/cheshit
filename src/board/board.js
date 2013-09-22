(function() {
   var module = angular.module('board', []);

   module.service('hand', function() {
      this.from = null;
      this.to = null;

      this.pickup = function(from) {
         if(this.from) {
            return;
         }

         this.from = from; 
      };

      this.updateTo = function(to) {
         this.to = to;
      };

      this.clear = function() {
         this.from = null;
         this.to = null;
      };
   });
   
   module.directive('square', function(hand) {

      return {
         restrict: 'E',
         templateUrl: 'board/square.html',
         replace: true,
         scope: {
           row : '=',
           file: '=',
           type: '='
         },

         link: function(scope, el, attrs, controller) {
            $(el).find('.piece').draggable({
               addClasses: false,
               revert: false,
               start: function() {
                  hand.pickup([scope.row, scope.file]);
               },
               stop: function() {
                  var from = hand.from;
                  var to = hand.to;
                  hand.clear();
                  
                  if(from[0] === to[0] && from[1] === to[1]) {
                     return;
                  }

                  scope.$emit('move', from, to);
               }
            });

            $(el).droppable({
               addClasses: false,
               tolerance: 'pointer',
               drop: function(event) {
               },
               over: function() {
                  hand.updateTo([scope.row, scope.file]);
               }
            });
         }
      };
   });

   module.directive('board', function() {

      return {
         restrict: 'E',
         templateUrl: 'board/board.html',
         replace: true,
         scope: {},
         controller: function($scope) {

         },

         link: function(scope, el, attrs, controller) {
            $(el).droppable({
               addClasses: false,
               tolerance: 'pointer',
               drop: function(event) {
               },
               over: function() {
                  hand.updateTo([scope.row, scope.file]);
               }
            });
         }
      };
   });


})();
