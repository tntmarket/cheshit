define(function(){
   function InitColorUtils(module) {
      module.service('ColorUtils', function() {
         this.color = function(pieceType) {
            if(pieceType === ' ') {
               return false;
            } else if(pieceType.toUpperCase() === pieceType) {
               return 'white';
            } else {
               return 'black';
            }
         };
      });
   }

   return InitColorUtils;
});
