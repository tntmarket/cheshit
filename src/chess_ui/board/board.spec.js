define([
   './board.js'
], function() {
   describe('thinger', function() {
      before(function() {
         require('chai').should();
      });

      it('should fuuuukin craayyyy', function() {
         var x = [1,2,3,4];

         x.should.have.length(4);
      });
   });
});
