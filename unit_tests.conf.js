// Karma configuration
// Generated on Wed Sep 25 2013 23:02:30 GMT-0700 (PDT)

module.exports = function(config) {
   config.set({
      preprocessors: {
         // prevents html2js from stopping text! from loading .html files
         '**/*.html': []
      },

      basePath: 'src/',

      // frameworks to use
      frameworks: [
         'requirejs',
         'mocha',
         'sinon-chai'
      ],


      // list of files / patterns to load in the browser
      files: [
         'test_main.js',
         {pattern: '**', included: false}
      ],

      // list of files to exclude
      exclude: [
         'main.js'
      ],


      // test results reporter to use
      // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
      reporters: ['progress'],


      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: false,


      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera
      // - Safari (only Mac)
      // - PhantomJS
      // - IE (only Windows)
      browsers: [],


      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 60000,


      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: false
   });
};
