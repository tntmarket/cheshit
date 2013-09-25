define([
   'firebase',
   'angularFire'
], function () {
   var Fire = angular.module('Fire', ['firebase']);

   Fire.factory('Sync', function(angularFire) {
      return function($scope, scopeProperty, firebaseUrl) {

         var ref = new Firebase(
            'https://cheshit.firebaseio.com/game' + firebaseUrl);

         angularFire(ref, $scope, scopeProperty);

         return ref;

      }
   });
});
