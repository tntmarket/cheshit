define([
   './color_utils.js'
], function() {
   describe("Color Utils", function() {

      var ColorUtils;

      beforeEach(function() {
         module('ChessUi');
         inject(function(_ColorUtils_) {
            ColorUtils = _ColorUtils_;
         });
      });

      describe("colorOf", function() {
         it("returns white for uppercase letters", function() {
            ['P', 'N', 'B', 'R', 'Q', 'K'].forEach(function(piece) {
               ColorUtils.colorOf(piece).should.equal('white');
            });
         });

         it("returns black for lowercase letters", function() {
            ['p', 'n', 'b', 'r', 'q', 'k'].forEach(function(piece) {
               ColorUtils.colorOf(piece).should.equal('black');
            });
         });

         it("returns false for empty spaces", function() {
            ColorUtils.colorOf(' ').should.equal(false);
         });
      });

      describe("opposite", function() {
         it("returns white for black pieces", function() {
            ColorUtils.opposite('white').should.equal('black');
         });

         it("returns black for white pieces", function() {
            ColorUtils.opposite('black').should.equal('white');
         });
      });

   });
});

