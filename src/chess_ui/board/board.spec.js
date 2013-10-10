define([
   './board.js'
],

function() {

   describe("The Chess Board", function() {

      var empty, friendly, friendly2, enemy, onMove;

      beforeEach(function() {
         module('ChessUi');

         inject(function($rootScope, $controller) {
            function Square(row, file, pieceType) {
               var scope = $rootScope.$new();
               var ctrl = $controller('BoardSquareCtrl', { $scope: scope });
               scope.setRowAndFile(row, file);
               scope.pieceType = pieceType;

               return {
                  scope: scope,
                  ctrl: ctrl,
                  rowFile: [row, file]
               };
            }

            $rootScope.onMove = onMove = sinon.spy();
            $rootScope.playingAs = 'white';

            empty = Square(0, 0, ' ');
            friendly = Square(1, 1, 'P');
            friendly2 = Square(2, 2, 'B');
            enemy = Square(3, 3, 'p');
         });

      });

      describe("the onMove event handler", function() {
         function move(start, end) {
            start.scope.startOrEndMove();
            end.scope.startOrEndMove();
         }

         function onMoveShouldFire(start, end) {
            move(start, end);
            onMove.should.have.been.calledWith({
               from: start.rowFile,
               to: end.rowFile
            });
         }

         function onMoveShouldNotFire(start, end) {
            move(start, end);
            onMove.should.not.have.been.called;
         }

         it("fires from friendly to enemy", function() {
            onMoveShouldFire(friendly, enemy);
         });
         it("fires from friendly to empty space", function() {
            onMoveShouldFire(friendly, empty);
         });
         it("doesn't fire from friendly to self", function() {
            onMoveShouldNotFire(friendly, friendly);
         });
         it("doesn't fire from friendly to other friendly", function() {
            onMoveShouldNotFire(friendly, friendly2);
         });
         it("doesn't fire from enemy to empty", function() {
            onMoveShouldNotFire(enemy, empty);
         });
         it("doesn't fire from enemy to friendly", function() {
            onMoveShouldNotFire(enemy, friendly);
         });
         it("doesn't fire from empty space to empty", function() {
            onMoveShouldNotFire(empty, empty);
         });
         it("doesn't fire from empty space to friendly", function() {
            onMoveShouldNotFire(empty, friendly);
         });
      });

      function click(square) {
         square.scope.startOrEndMove();
      }

      describe("the square style", function() {
         function squareClassOf(square) {
            return square.scope.squareClass();
         }

         it("should highlight friendly squares when clicked", function() {
            click(friendly);
            squareClassOf(friendly).should.include('square-selected');
         });

         it("should change highlighting when reselecting", function() {
            click(friendly);
            squareClassOf(friendly).should.include('square-selected');
            click(friendly2);
            squareClassOf(friendly).should.not.include('square-selected');
            squareClassOf(friendly2).should.include('square-selected');
         });

         it("should not highlight empty or enemy squares", function() {
            click(enemy);
            squareClassOf(enemy).should.not.include('square-selected');
            click(empty);
            squareClassOf(empty).should.not.include('square-selected');
         });

         it("should unhighlight after capturing", function() {
            click(friendly);
            squareClassOf(friendly).should.include('square-selected');
            click(enemy);
            squareClassOf(friendly).should.not.include('square-selected');
         });

         it("should unhighlight after moving", function() {
            click(friendly);
            squareClassOf(friendly).should.include('square-selected');
            click(empty);
            squareClassOf(empty).should.not.include('square-selected');
         });

         it("should be a fist cursor for empties after selecting", function() {
            click(friendly);
            squareClassOf(empty).should.include('fist-cursor');
         });
      });

      describe("the piece cursor", function() {
         function pieceClassOf(square) {
            return square.scope.pieceClass();
         }

         it("should be a finger for friendlies", function() {
            pieceClassOf(friendly).should.include('finger-cursor');
            pieceClassOf(friendly2).should.include('finger-cursor');
         });

         it("should be the default for enemies", function() {
            pieceClassOf(enemy).should.not.include('cursor');
         });

         it("should be a fist/finger for selected/unselected friendlies ", function() {
            click(friendly);
            pieceClassOf(friendly).should.include('fist-cursor');
            pieceClassOf(friendly2).should.include('finger-cursor');
         });

         it("should be a crosshair for enemies after selecting", function() {
            click(friendly);
            pieceClassOf(enemy).should.include('crosshair-cursor');
         });

      });

   });
});
