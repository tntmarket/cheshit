//white on top, black bottom

boardA = {
    squares: [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    [ 'p', ' ', 'p', 'p', 'p', 'p', 'p', 'p' ],
    [ ' ', ' ', '', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', 'K', ' ', ' ', ' ', ' ' ],
    [ ' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ 'L', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ 'P', ' ', 'P', ' ', 'P', 'P', 'P', 'P' ],     
    [ 'R', 'N', 'B', 'Q', '', 'B', 'N', 'R' ],
    ],
    backup: [ 'P', 'P', 'R' ]
}
//white on top, black bottom
boardB = {
    squares: [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    [ 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P' ],   
    [ 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' ],
    ],
    backup: [ 'P', 'P', 'R' ]
}
function notCheck(oldPos, newPos, board ) {
   var type = board.squares[oldPos[0]][oldPos[1]];

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
    else return true;
}
//
function makeMove(oldPos, newPos, board ) {
    var type = board.squares[oldPos[0]][oldPos[1]];
    var newType = board.squares[newPos[0]][newPos[1]];
    
    switch (type){
     case 'p':
     if (board.squares[newPos[0]] [newPos[1]] === ' ') {
        if (oldPos[0] === 1 && (newPos[0]=== oldPos[0]+2) && (newPos[1] === oldPos[1])) {
            board.squares[oldPos[0]][oldPos[1]] = ' ';
            board.squares[newPos[0]][newPos[1]] = 'p';

            return true;
        }
        else if ((newPos[0]=== oldPos[0]+1) && (newPos[1] === oldPos[1])) {
            board.squares[oldPos[0]][oldPos[1]] = ' ';
            board.squares[newPos[0]][newPos[1]] = 'p';

            return true;
        }
        else{
            return false;
        }
    }
    else if( (newPos[0]=== (oldPos[0] +1)) && (newPos[1]=== (oldPos[1]+1)) && notSameType(type,newType)){

        board.backup.push(board.squares[newPos[0]][newPos[1]]);
        board.squares[oldPos[0]][oldPos[1]] = ' ';
        board.squares[newPos[0]][newPos[1]] = 'p';
        return true;
    }
    else if( (newPos[0]=== (oldPos[0] +1)) && (newPos[1]=== (oldPos[1]-1)) && notSameType(type,newType)){
        board.backup.push(board.squares[newPos[0]][newPos[1]]);
        board.squares[oldPos[0]][oldPos[1]] = ' ';
        board.squares[newPos[0]][newPos[1]] = 'p';
        return true;
    }
    else return false;
    break;


    case 'P':
    if (board.squares[newPos[0]] [newPos[1]] === ' ') {
        if (oldPos[0] === 6 && (newPos[0]=== oldPos[0]-2) && (newPos[1] === oldPos[1])) {
            board.squares[oldPos[0]][oldPos[1]] = ' ';
            board.squares[newPos[0]][newPos[1]] = 'P';

            return true;
        }

       else if ((newPos[0]=== oldPos[0]-1) && (newPos[1] === oldPos[1])) {
            board.squares[oldPos[0]][oldPos[1]] = ' ';
            board.squares[newPos[0]][newPos[1]] = 'P';

            return true;
        }
        else{
            return false;
        }
    }
    else if( (newPos[0]=== (oldPos[0] -1)) && (newPos[1]=== (oldPos[1]-1)) && notSameType(type,newType)){
        board.backup.push(board.squares[newPos[0]][newPos[1]]);
        board.squares[oldPos[0]][oldPos[1]] = ' ';
        board.squares[newPos[0]][newPos[1]] = 'P';
        return true;
    }
    else if( (newPos[0]=== (oldPos[0] -1)) && (newPos[1]=== (oldPos[1]+1)) && notSameType(type,newType)){
        board.backup.push(board.squares[newPos[0]][newPos[1]]);
        board.squares[oldPos[0]][oldPos[1]] = ' ';
        board.squares[newPos[0]][newPos[1]] = 'P';
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
                    if(board.squares[oldPos[0]][i] != ' '){
                        return false;
                    }
                }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }
                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;

                       return true;
                   }
                   else return false;

               }
               else{

                   for (var i = newPos[1] +1; i< oldPos[1]; i++) {
                    if(board.squares[oldPos[0]][i] != ' '){
                        return false;
                    }
                }

                      //moving to empty space
                      if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }
                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;

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
                        if(board.squares[i][oldPos[1]] != ' '){
                            return false;
                        }
                    }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }
                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;

                       return true;
                   }
                   else return false

               }
           else{

               for (var i = newPos[0] +1; i< oldPos[0]; i++) {
                if(board.squares[i][oldPos[1]] != ' '){
                    return false;
                }
            }

                      //moving to empty space
                      if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }
                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;

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


            if (board.squares[newPos[0]][newPos[1]] === ' ') {
                board.squares[oldPos[0]][oldPos[1]] = ' ';
                board.squares[newPos[0]][newPos[1]] = type;

                return true;
            }
       //capturing a piece
       else if(notSameType(type,newType)){
          board.backup.push(board.squares[newPos[0]][newPos[1]]);
          board.squares[oldPos[0]][oldPos[1]] = ' ';
          board.squares[newPos[0]][newPos[1]] = type;
          return true;
      }

      else return false;


  }

  break;
  case 'B':
  case 'b':
  if (Math.abs(newPos[0] - oldPos[0]) === Math.abs(newPos[1] - oldPos[1])) {
    if((newPos[0] > oldPos[0]) && (newPos[1] > oldPos[1])){
        for (var i = oldPos[0] + 1; i < newPos; i++) {
            if (board.squares[i][i]!= ' ') {
                return false;
            }
        }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }

                    //capturing a piece
                    else if(notSameType(type,newType)){
                     board.backup.push(board.squares[newPos[0]][newPos[1]]);
                     board.squares[oldPos[0]][oldPos[1]] = ' ';
                     board.squares[newPos[0]][newPos[1]] = type;
                     return true;
                 }
                 else return false;
             }

             if((newPos[0] < oldPos[0]) && (newPos[1] < oldPos[1])){
                for (var i = newPos[0] + 1; i < oldPos; i++) {
                    if (board.squares[i][i]!= ' ') {
                        return false;
                    }
                }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }

                    //capturing a piece
                    else if(notSameType(type,newType)){
                     board.backup.push(board.squares[newPos[0]][newPos[1]]);
                     board.squares[oldPos[0]][oldPos[1]] = ' ';
                     board.squares[newPos[0]][newPos[1]] = type;
                     return true;
                 }
                 else return false;
             }

             if((newPos[0] < oldPos[0]) && (newPos[1] > oldPos[1])){
                for (var i = 1; i + newPos[0] < oldPos[0]; i++) {
                    if (board.squares[newPos[0]+i][newPos[1]-i]!= ' ') {
                        return false;
                    }
                }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }

                    //capturing a piece
                    else if(notSameType(type,newType)){
                     board.backup.push(board.squares[newPos[0]][newPos[1]]);
                     board.squares[oldPos[0]][oldPos[1]] = ' ';
                     board.squares[newPos[0]][newPos[1]] = type;
                     return true;
                 }

                 else return false;
             }

             if((newPos[0] > oldPos[0]) && (newPos[1] < oldPos[1])){
                for (var i = 1; i + newPos[1] < oldPos[1]; i++) {
                    if (board.squares[newPos[0]-i][newPos[1]+i]!= ' ') {
                        return false;
                    }
                }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }

                    //capturing a piece
                    else if(notSameType(type,newType)){
                     board.backup.push(board.squares[newPos[0]][newPos[1]]);
                     board.squares[oldPos[0]][oldPos[1]] = ' ';
                     board.squares[newPos[0]][newPos[1]] = type;
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
                        if(board.squares[oldPos[0]][i] != ' '){
                            return false;
                        }
                    }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }
                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;

                       return true;
                   }

                   else return false;


               }
               else{

                   for (var i = newPos[1] +1; i< oldPos[1]; i++) {
                    if(board.squares[oldPos[0]][i] != ' '){
                        return false;
                    }
                }

                      //moving to empty space
                      if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }
                    //capturing a piece
                    else if (notSameType(type,newType)) {
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;

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
                        if(board.squares[i][oldPos[1]] != ' '){
                            return false;
                        }
                    }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }
                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;
                         return true;
                   }

                   else return false;


               }
               else{

                   for (var i = newPos[0] +1; i< oldPos[0]; i++) {
                    if(board.squares[i][oldPos[1]] != ' '){
                        return false;
                    }
                }

                      //moving to empty space
                      if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }
                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;

                       return true;
                   }
                   else return false;

               }

           }
           else if (Math.abs(newPos[0] - oldPos[0]) === Math.abs(newPos[1] - oldPos[1])) {
            if((newPos[0] > oldPos[0]) && (newPos[1] > oldPos[1])){
                for (var i = oldPos[0] + 1; i < newPos; i++) {
                    if (board.squares[i][i]!= ' ') {
                        return false;
                    }
                }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }

                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;
                       return true;
                   }

                   else return false;
               }

               if((newPos[0] < oldPos[0]) && (newPos[1] < oldPos[1])){
                for (var i = newPos[0] + 1; i < oldPos; i++) {
                    if (board.squares[i][i]!= ' ') {
                        return false;
                    }
                }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }

                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;
                       return true;
                   }

                   else return false;
               }

               if((newPos[0] < oldPos[0]) && (newPos[1] > oldPos[1])){
                for (var i = 1; i + newPos[0] < oldPos[0]; i++) {
                    if (board.squares[newPos[0]+i][newPos[1]-i]!= ' ') {
                        return false;
                    }
                }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }

                    //capturing a piece
                    else if(notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;
                       return true;
                   }

                   else return false;
               }

               if((newPos[0] > oldPos[0]) && (newPos[1] < oldPos[1])){
                for (var i = 1; i + newPos[1] < oldPos[1]; i++) {
                    if (board.squares[newPos[0]-i][newPos[1]+i]!= ' ') {
                        return false;
                    }
                }

                    //moving to empty space
                    if (board.squares[newPos[0]][newPos[1]] === ' ') {
                        board.squares[oldPos[0]][oldPos[1]] = ' ';
                        board.squares[newPos[0]][newPos[1]] = type;

                        return true;
                    }

                    //capturing a piece
                    else if (notSameType(type,newType)){
                       board.backup.push(board.squares[newPos[0]][newPos[1]]);
                       board.squares[oldPos[0]][oldPos[1]] = ' ';
                       board.squares[newPos[0]][newPos[1]] = type;
                       return true;
                   }

                   else return false;
               }

           }
           else return false;
       }

       break;

        case 'k':
       case 'K':
       if (((Math.abs(oldPos[0] - newPos[0])) <= 1) && (Math.abs(oldPos[1] - newPos[1]))) {
            //moving to an empty square where you cant get checked
            if(board.squares[newPos[0]][newPos[1]] === ' ' && notCheck([oldPos[0]oldPos[1]],[newPos[0]][newPos[1]],board){
                board.squares[oldPos[0]][oldPos[1]] = ' ';
                board.squares[newPos[0]][newPos[1]] = type;

                return true;

            }
            else if(notSameType(type,newType) && notCheck([oldPos[0]oldPos[1]],[newPos[0]][newPos[1]],board)){
                board.backup.push(board.squares[newPos[0]][newPos[1]]);
                board.squares[oldPos[0]][oldPos[1]] = ' ';
                board.squares[newPos[0]][newPos[1]] = type;
                return true;                
            }
            else return false;
        }
       

       break;
   }
    //return type;
    //return true; // if valid, and mutate board
    
  //  return false; // if invalid, don't mutate boa
}