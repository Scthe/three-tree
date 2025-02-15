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
      "<%= buildDir %>/app.js": ['<%= config.app %>/src/main.js']
    }
  }
};
