define(function() {

   try {
      return angular.module('ChessUi');
   } catch (error) {
      if(error.message === 'No module: ChessUi') {
         return angular.module('ChessUi', []);
      }
      throw error;
   }

});
