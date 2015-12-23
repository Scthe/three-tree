'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var config = {
    app: '.',
    env: {
      dev:  { buildDir: '.tmp' },
      prod: { buildDir: 'build' }
    }
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    config      : config,
    env         : config.env,
    autoprefixer: require('./grunt/config/autoprefixer'),
    browserify  : require('./grunt/config/browserify'),
    clean       : require('./grunt/config/clean'),
    connect     : require('./grunt/config/connect'),
    copy        : require('./grunt/config/copy'),
    watch       : require('./grunt/config/watch')
  });

  grunt.registerTask('loadconst', 'Load constants', function() {
    // console.log('ENV: ' + process.env.name);
    grunt.config('buildDir', process.env.buildDir);
  });

  grunt.registerTask('start', 'Compile then start a connect web server', function(target) {
    grunt.task.run([
      'env:dev',
      'loadconst',
      'clean',
      'copy:assets',
      'copy:vendor',
      'autoprefixer:dist',
      'browserify',
      'connect',
      'watch'
    ]);
  });

  grunt.registerTask('default', [ 'start' ]);

  grunt.registerTask('build', [
    'env:prod',
    'loadconst',
    'clean',
    'copy:assets',
    'copy:vendor',
    'autoprefixer:build',
    'browserify'
  ]);
};
