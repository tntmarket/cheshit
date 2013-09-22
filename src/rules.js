//white on top, black bottom

gameA = {
   board: [
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
gameB = {
   board: [
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

function Board(board) {
   this.board = board;
}

Board.prototype = {
   pieceAt: function(position, newPiece) {
      if(newPiece) {
         this.board[position[0]][position[1]] = newPiece;
         return;
      }
      return this.board[position[0]][position[1]];
   },
   clear: function(position) {
      this.board[position[0]][position[1]] = ' ';
   },
   at: function(row, file) {
      return this.board[row][file];
   }
}


function notCheck(oldPos, newPos, game ) {
   var board = new Board(game.board);

   var type = board.pieceAt(oldPos);

   if(type == type.toUpperCase()) {
      for (var i = 0; i < 8; i++) {
         for(var j =0; j < 8; j++) {
            if(board.at([i][j] != ' ' &&
               board.at(i,j) == board.at(i,j).toLowerCase &&
               makeMove([i,j], newPos, game)) ) {
               return false;
            }
         }
      }
      return true;
   }

   else if(type == type.toLowerCase()){
      for (var i = 0; i < 8; i++) {
         for(var j =0; j < 8; j++){
            if(board.board.at(i,j) != ' ' &&
               board.board.at(i,j) == board.board.at(i,j).toUpperCase &&
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

function makeMove(oldPos, newPos, game ) {
   var board = new Board(game.board);

   var type = board.pieceAt(oldPos);
   var newType = board.pieceAt(newPos);

   var backup = game.backup;

   switch (type){
      case 'p':
         if (board.pieceAt(newPos) === ' ') {
            if (oldPos[0] === 1 && (newPos[0]=== oldPos[0]+2) && (newPos[1] === oldPos[1])) {
               board.clear(oldPos);
               board.pieceAt(newPos, type);

               return true;
            }
            else if ((newPos[0]=== oldPos[0]+1) && (newPos[1] === oldPos[1])) {
               board.clear(oldPos);
               board.pieceAt(newPos, type);

               return true;
            }
            else{
               return false;
            }
         }
         else if( (newPos[0]=== (oldPos[0] +1)) && (newPos[1]=== (oldPos[1]+1)) && notSameType(type,newType)){

            backup.push(board.pieceAt(newPos));
            board.clear(oldPos);
            board.pieceAt(newPos, type);
            return true;
         }
         else if( (newPos[0]=== (oldPos[0] +1)) && (newPos[1]=== (oldPos[1]-1)) && notSameType(type,newType)){
            backup.push(board.pieceAt(newPos));
            board.clear(oldPos);
            board.pieceAt(newPos, type);
            return true;
         }
         else return false;
         break;


      case 'P':
         if (board.pieceAt(newPos) === ' ') {
            if (oldPos[0] === 6 && (newPos[0]=== oldPos[0]-2) && (newPos[1] === oldPos[1])) {
               board.clear(oldPos);
               board.pieceAt(newPos, type);

               return true;
            }

            else if ((newPos[0]=== oldPos[0]-1) && (newPos[1] === oldPos[1])) {
               board.clear(oldPos);
               board.pieceAt(newPos, type);

               return true;
            }
            else{
               return false;
            }
         }
         else if( (newPos[0]=== (oldPos[0] -1)) && (newPos[1]=== (oldPos[1]-1)) && notSameType(type,newType)){
            backup.push(board.pieceAt(newPos));
            board.clear(oldPos);
            board.pieceAt(newPos, type);
            return true;
         }
         else if( (newPos[0]=== (oldPos[0] -1)) && (newPos[1]=== (oldPos[1]+1)) && notSameType(type,newType)){
            backup.push(board.pieceAt(newPos));
            board.clear(oldPos);
            board.pieceAt(newPos, type);
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
                  if(board.at(oldPos[0],i) != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               else return false;

            }
            else{

               for (var i = newPos[1] +1; i< oldPos[1]; i++) {
                  if(board.at(oldPos[0],i) != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

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
                  if(board.at(i, oldPos[1]) != ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               else return false;
            }
            else {

               for (var i = newPos[0] +1; i< oldPos[0]; i++) {
                  if(board.at(i, oldPos[1]) != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

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


            if (board.pieceAt(newPos) === ' ') {
               board.clear(oldPos);
               board.pieceAt(newPos, type);

               return true;
            }
            //capturing a piece
            else if(notSameType(type,newType)){
               backup.push(board.pieceAt(newPos));
               board.clear(oldPos);
               board.pieceAt(newPos, type);
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
                  if (board.at(i,i)!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
                  return true;
               }
               else return false;
            }

            if((newPos[0] < oldPos[0]) && (newPos[1] < oldPos[1])){
               for (var i = newPos[0] + 1; i < oldPos; i++) {
                  if (board.at(i,i)!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
                  return true;
               }
               else return false;
            }

            if((newPos[0] < oldPos[0]) && (newPos[1] > oldPos[1])){
               for (var i = 1; i + newPos[0] < oldPos[0]; i++) {
                  if (board.at(newPos[0]+i,newPos[1]-i)!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

            if((newPos[0] > oldPos[0]) && (newPos[1] < oldPos[1])){
               for (var i = 1; i + newPos[1] < oldPos[1]; i++) {
                  if (board.at(newPos[0]-i,newPos[1]+i)!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
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
                  if(board.at(oldPos[0],i) != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               else return false;


            }

            else {
               for (var i = newPos[1] +1; i< oldPos[1]; i++) {
                  if(board.at(oldPos[0],i) != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if (notSameType(type,newType)) {
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

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
                  if(board.at(i,oldPos[1]) != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
                  return true;
               }

               else return false;


            }
            else {
               for (var i = newPos[0] +1; i< oldPos[0]; i++) {
                  if(board.at(i,oldPos[1]) != ' '){
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }
               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

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
                  if (board.at(i,i)!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

            if((newPos[0] < oldPos[0]) && (newPos[1] < oldPos[1])){
               for (var i = newPos[0] + 1; i < oldPos; i++) {
                  if (board.at(i,i)!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

            if((newPos[0] < oldPos[0]) && (newPos[1] > oldPos[1])){
               for (var i = 1; i + newPos[0] < oldPos[0]; i++) {
                  if (board.at(newPos[0]+i,newPos[1]-i) != ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if(notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
                  return true;
               }

               else return false;
            }

            if((newPos[0] > oldPos[0]) && (newPos[1] < oldPos[1])){
               for (var i = 1; i + newPos[1] < oldPos[1]; i++) {
                  if (board.at(newPos[0]-i,newPos[1]+i)!= ' ') {
                     return false;
                  }
               }

               //moving to empty space
               if (board.pieceAt(newPos) === ' ') {
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);

                  return true;
               }

               //capturing a piece
               else if (notSameType(type,newType)){
                  backup.push(board.pieceAt(newPos));
                  board.clear(oldPos);
                  board.pieceAt(newPos, type);
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
            if(board.pieceAt(newPos) === ' ' && notCheck([oldPos[0], oldPos[1]],[newPos[0]][newPos[1]], game)) {
               board.clear(oldPos);
               board.pieceAt(newPos, type);

               return true;
            }
            else if(notSameType(type,newType) && notCheck([oldPos[0], oldPos[1]],[newPos[0]][newPos[1]], game)) {
               backup.push(board.pieceAt(newPos));
               board.clear(oldPos);
               board.pieceAt(newPos, type);
               return true;
            }
            else return false;
         }
         break;
   }
}
