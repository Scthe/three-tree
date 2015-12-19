'use strict';

module.exports = {
  dist: {
    options: {
       transform: [
          ["babelify", {
             loose: "all"
          }]
       ]
    },
    files: {
      // "<%= buildDir %>/app.js": ['<%= config.app %>/src/app.js']
      ".tmp/app.js": ['<%= config.app %>/src/app.js']
    }
  }
};
