define(function(){
   function InitUtils(module) {
      module.service('utils', function() {
         this.color = function(pieceType) {
            if(pieceType === ' ') {
               return false;
            } else if(pieceType.toUpperCase() === pieceType) {
               return 'white';
            } else {
               return 'black';
            }
         }
      });
   }

   return InitUtils;
});
