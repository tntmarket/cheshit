//white on top, black bottom

boardA = {
   squares: [
      [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
      [ 'p', ' ', 'p', 'p', 'p', 'p', 'p', 'p' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', 'K', ' ', ' ', ' ', ' ' ],
      [ ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ 'L', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ 'P', ' ', 'P', ' ', 'P', 'P', 'P', 'P' ],
      [ 'R', 'N', 'B', 'Q', ' ', 'B', 'N', 'R' ]
   ],
   backup: [ 'P', 'P', 'R' ]
};

//white on top, black bottom
boardB = {
   squares: [
      [ 'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r' ],
      [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
      [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],
      [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ]
   ],
   backup: [ 'P', 'P', 'R' ]
};

function Board(squares) {
   this.squares = squares;
}

Board.prototype = {
   pieceAt: function(position, newPiece) {
      if(newPiece) {
         this.squares[position[0]][position[1]] = newPiece;
         return;
      }
      return this.squares[position[0]][position[1]];
   },
   clear: function(position) {
      this.squares[position[0]][position[1]] = ' ';
   },
   at: function(row, file) {
      return this.squares[row][file];
   }
}


function notCheck(oldPos, newPos, board ) {
   var type = board.squares.pieceAt(oldPos);

   if(type == type.toUpperCase()){
      for (var i = 0; i < 8; i++) {
         for(var j =0; j < 8; j++){
            if(board.squares[i][j] != ' ' &&
               board.squares[i][j] == board.squares[i][j].toLowerCase &&
               makeMove([i,j], newPos, board)){
               return false;
            }
         }
      }
      return true;
   }

   else if(type == type.toLowerCase()){
      for (var i = 0; i < 8; i++) {
         for(var j =0; j < 8; j++){
            if(board.squares[i][j] != ' ' &&
               board.squares[i][j] == board.squares[i][j].toUpperCase &&
               makeMove([i,j], newPos, board)){
               return false;
            }
         }
      }
   }
}

function notSameType(type1, type2){
   if (type1 == type1.toUpperCase() && type2 == type2.toUpperCase()) {
      return false;

   }
   else if (type1 == type1.toLowerCase() && type2 == type2.toLowerCase()) {
      return false;
   }
   else {
      return true;
   }
}

function makeMove(oldPos, newPos, board ) {
   var squares = new Board(board.squares);

   var type = squares.pieceAt(oldPos);
   var newType = squares.pieceAt(newPos);

   var backup = board.backup;
   switch (type){
      case 'p':
         if (squares[newPos[0]] [newPos[1]] === ' ') {
            if (oldPos[0] === 1 && (newPos[0]=== oldPos[0]+2) && (newPos[1] === oldPos[1])) {
               squares.clear(oldPos);
               squares.pieceAt(newPos, type);

               return true;
            }
            else if ((newPos[0]=== oldPos[0]+1) && (newPos[1] === oldPos[1])) {
               squares.clear(oldPos);
               squares.pieceAt(newPos, type);

               return true;
            }
            else{
               return false;
            }
         }
         else if( (newPos[0]=== (oldPos[0] +1)) && (newPos[1]=== (oldPos[1]+1)) && notSameType(type,newType)){

            backup.push(squares.pieceAt(newPos));
            squares.clear(oldPos);
            squares.pieceAt(newPos, type);
            return true;
         }
         else if( (newPos[0]=== (oldPos[0] +1)) && (newPos[1]=== (oldPos[1]-1)) && notSameType(type,newType)){
            backup.push(squares.pieceAt(newPos));
            squares.clear(oldPos);
            squares.pieceAt(newPos, type);
            return true;
         }
         else return false;
         break;


      case 'P':
         if (squares[newPos[0]] [newPos[1]] === ' ') {
            if (oldPos[0] === 6 && (newPos[0]=== oldPos[0]-2) && (newPos[1] === oldPos[1])) {
               squares.clear(oldPos);
               squares.pieceAt(newPos, type);

               return true;
            }

            else if ((newPos[0]=== oldPos[0]-1) && (newPos[1] === oldPos[1])) {
               squares.clear(oldPos);
               squares.pieceAt(newPos, type);

               return true;
            }
            else{
               return false;
            }
         }
         else if( (newPos[0]=== (oldPos[0] -1)) && (newPos[1]=== (oldPos[1]-1)) && notSameType(type,newType)){
            backup.push(squares.pieceAt(newPos));
            squares.clear(oldPos);
            squares.pieceAt(newPos, type);
            return true;
         }
         else if( (newPos[0]=== (oldPos[0] -1)) && (newPos[1]=== (oldPos[1]+1)) && notSameType(type,newType)){
            backup.push(squares.pieceAt(newPos));
            squares.clear(oldPos);
            squares.pieceAt(newPos, type);
            return true;
         }
         else return false;
         break;

      case 'R':
      case 'r':
         //moving horizontally
         if(newPos[0] === oldPos[0]){
            if(newPos[1]> oldPos[1]){
               //check if something in between
               for (var i = oldPos[1] +1; i< newPos[1]; i++) {
                  if(squares[oldPos[0]][i] != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               else return false;

            }
            else{

               for (var i = newPos[1] +1; i< oldPos[1]; i++) {
                  if(squares[oldPos[0]][i] != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               else return false;

            }


         }
         //moving vertically
         else if(newPos[1] === oldPos[1]) {

            if(newPos[0]> oldPos[0]) {
               //check if something in between
               for (var i = oldPos[0] +1; i< newPos[0]; i++) {
                  if(squares[i][oldPos[1]] != ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               else return false;
            }
            else {

               for (var i = newPos[0] +1; i< oldPos[0]; i++) {
                  if(squares[i][oldPos[1]] != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               else return false;

            }

         }
         else{
            return false;
         }

         break;
      case 'N':
      case 'n':

         if(((newPos[0]===oldPos[0] + 2) &&(newPos[1]===oldPos[1] + 1)) || ((newPos[0]===oldPos[0] + 2) &&(newPos[1]===oldPos[1] - 1)) ||
            ((newPos[0]===oldPos[0] + 1) &&(newPos[1]===oldPos[1] + 2)) || ((newPos[0]===oldPos[0] + 1) &&(newPos[1]===oldPos[1] - 2)) ||
            ((newPos[0]===oldPos[0] - 2) &&(newPos[1]===oldPos[1] + 1)) || ((newPos[0]===oldPos[0] - 2) &&(newPos[1]===oldPos[1] - 1)) ||
            ((newPos[0]===oldPos[0] - 1) &&(newPos[1]===oldPos[1] + 2)) || ((newPos[0]===oldPos[0] - 1) &&(newPos[1]===oldPos[1] - 2))){


            if (squares.pieceAt(newPos) === ' ') {
               squares.clear(oldPos);
               squares.pieceAt(newPos, type);

               return true;
            }
            //capturing a piece
            else if(notSameType(type,newType)){
               backup.push(squares.pieceAt(newPos));
               squares.clear(oldPos);
               squares.pieceAt(newPos, type);
               return true;
            }

            else {
               return false;
            }



         }

         break;

      case 'B':
      case 'b':
         if (Math.abs(newPos[0] - oldPos[0]) === Math.abs(newPos[1] - oldPos[1])) {
            if((newPos[0] > oldPos[0]) && (newPos[1] > oldPos[1])){
               for (var i = oldPos[0] + 1; i < newPos; i++) {
                  if (squares[i][i]!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }
               else return false;
            }

            if((newPos[0] < oldPos[0]) && (newPos[1] < oldPos[1])){
               for (var i = newPos[0] + 1; i < oldPos; i++) {
                  if (squares[i][i]!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }
               else return false;
            }

            if((newPos[0] < oldPos[0]) && (newPos[1] > oldPos[1])){
               for (var i = 1; i + newPos[0] < oldPos[0]; i++) {
                  if (squares[newPos[0]+i][newPos[1]-i]!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

            if((newPos[0] > oldPos[0]) && (newPos[1] < oldPos[1])){
               for (var i = 1; i + newPos[1] < oldPos[1]; i++) {
                  if (squares[newPos[0]-i][newPos[1]+i]!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

         }
         else return false;

         break;


      case 'Q':
      case 'q':

         //moving horizontally
         if(newPos[0] === oldPos[0]){
            if(newPos[1]> oldPos[1]){
               //check if something in between
               for (var i = oldPos[1] +1; i< newPos[1]; i++) {
                  if(squares[oldPos[0]][i] != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               else return false;


            }

            else {
               for (var i = newPos[1] +1; i< oldPos[1]; i++) {
                  if(squares[oldPos[0]][i] != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if (notSameType(type,newType)) {
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               else return false;

            }

         }
         //moving vertically
         else if(newPos[1] === oldPos[1]){

            if(newPos[0]> oldPos[0]){
               //check if something in between
               for (var i = oldPos[0] +1; i< newPos[0]; i++) {
                  if(squares[i][oldPos[1]] != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }

               else return false;


            }
            else {
               for (var i = newPos[0] +1; i< oldPos[0]; i++) {
                  if(squares[i][oldPos[1]] != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }
               else {
                  return false;
               }

            }

         }
         else if (Math.abs(newPos[0] - oldPos[0]) === Math.abs(newPos[1] - oldPos[1])) {
            if((newPos[0] > oldPos[0]) && (newPos[1] > oldPos[1])) {
               for (var i = oldPos[0] + 1; i < newPos; i++) {
                  if (squares[i][i]!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

            if((newPos[0] < oldPos[0]) && (newPos[1] < oldPos[1])){
               for (var i = newPos[0] + 1; i < oldPos; i++) {
                  if (squares[i][i]!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

            if((newPos[0] < oldPos[0]) && (newPos[1] > oldPos[1])){
               for (var i = 1; i + newPos[0] < oldPos[0]; i++) {
                  if (squares[newPos[0]+i][newPos[1]-i]!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

            if((newPos[0] > oldPos[0]) && (newPos[1] < oldPos[1])){
               for (var i = 1; i + newPos[1] < oldPos[1]; i++) {
                  if (squares[newPos[0]-i][newPos[1]+i]!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (squares.pieceAt(newPos) === ' ') {
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if (notSameType(type,newType)){
                  backup.push(squares.pieceAt(newPos));
                  squares.clear(oldPos);
                  squares.pieceAt(newPos, type);
                  return true;
               }

               else {
                  return false;
               }
            }

         }
         else {
            return false;
         }
         break;


      case 'k':
      case 'K':

         if ((Math.abs(oldPos[0] - newPos[0]) <= 1) && (Math.abs(oldPos[1] - newPos[1]))) {
            //moving to an empty square where you cant get checked
            if(squares.pieceAt(newPos) === ' ' && notCheck([oldPos[0], oldPos[1]],[newPos[0]][newPos[1]],board)) {
               squares.clear(oldPos);
               squares.pieceAt(newPos, type);

               return true;
            }
            else if(notSameType(type,newType) && notCheck([oldPos[0], oldPos[1]],[newPos[0]][newPos[1]],board)) {
               backup.push(squares.pieceAt(newPos));
               squares.clear(oldPos);
               squares.pieceAt(newPos, type);
               return true;
            }
            else return false;
         }
         break;
   }
}
