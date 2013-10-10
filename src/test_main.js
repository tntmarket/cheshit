(function() {
   var tests = [];

   for(var file in window.__karma__.files) {
      if (window.__karma__.files.hasOwnProperty(file)) {
         if (/\.spec\.js$/.test(file)) {
            tests.push(file);
         }
      }
   }

   var alwaysNeeded = ['angular', 'mocks'];

   require.config({
      baseUrl: '/base',

      paths: {
         angular: 'lib/angular',
         mocks: 'lib/angular-mocks',
         fire: 'fire/fire_mock',
         text: 'lib/text'
      },
      map: {
         '*': {
            css: 'lib/require-css/css'
         }
      },
      shim: {
         angular: {
            exports: 'angular'
         },
         mocks: {
            deps: ['angular']
         }
      },

      deps: tests.concat(alwaysNeeded),

      callback: window.__karma__.start

   });

})();
