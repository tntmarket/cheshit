var tests = [];

for(var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\.spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
   baseUrl: '/base',

   paths: {
      angular: 'lib/angular',
      fire: 'fire/fire_mock',
      text: 'lib/text'
   },
   map: {
      '*': {
         css: 'lib/require-css/css'
      }
   },
   shim: {
      'angular': {
         exports: 'angular'
      }
   },

   deps: tests,

   callback: window.__karma__.start
});
