module.exports = function(grunt) {
   var initConfig;
   initConfig = {
      pkg: grunt.file.readJSON('package.json'),
      symlink: {
         bower: {
         }
      }
   };
   grunt.initConfig(initConfig);
   grunt.loadNpmTasks('grunt-contrib-symlink');
   return grunt.registerTask('default', []);
};
