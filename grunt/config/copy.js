'use strict';

// Copies remaining files to places other tasks can use
module.exports = {
  assets: {
      expand: true,
      dot: true,
      cwd: '<%= app %>',
      dest: '<%= buildDir %>',
      src: [
        'images/*.{ico,png,gif,jpg}',
        '*.html',
        'webgl-utils.js'
      ]
  },
  watchHtml: {
    cwd: '<%= app %>',
    dest: '.tmp/',
    src: [
      '*.html',
    ]
  },
  vendor: {
      expand: true,
      cwd: 'node_modules',
      dest: '<%= buildDir %>/vendor',
      src: [
        'underscore/underscore-min.js',
        'three/three.min.js',
        // 'dat-gui/vendor/dat.color.js',
        // 'dat-gui/vendor/dat.gui.js',
      ]
  }
};
