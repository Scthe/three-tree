'use strict';

// The actual grunt server settings
module.exports = {
  options: {
      hostname: 'localhost',
      port: 9000
  },
  dist: {
    options: {
      open: true,
      base: '<%= buildDir %>',
      // keepalive: true,
      livereload: false
    }
  }
};
