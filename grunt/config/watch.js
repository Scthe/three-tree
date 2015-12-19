'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  js: {
    // files: ['<%= config.app %>/src/{,*/}*.js'],
    files: ['src/**/*.js'],
    tasks: ['browserify']
  },
  index: {
    files: ['*.html'],
    tasks: ['copy:watchHtml']
  },
};
