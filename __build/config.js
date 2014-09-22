'use strict';
var util = require('util');
var pkg = require('../package.json');

var dest = './public';
module.exports = {
  dest: dest,
  browserSync: {
    server: {
      baseDir: [dest]
    },
    files: [
      dest + "/**",
      "!" + dest + "/**.map"
    ]
  },
  markup: {
    src: '__web/index.html',
    dest: dest
  },
  styles: {
    src: '__styles/index.less',
    dest: util.format('%s/css', dest),
    outputName: util.format('%s.css', pkg.name)
  },
  images: {
    src: '__styles/images/**/*.*',
    dest: util.format('%s/css', dest)
  },
  scripts: {
    debug: true,
    transforms: [
      ['reactify', {
        'everything': true
      }],
      ['coffeeify']
    ],
    bundleConfigs: [{
      entries: './__apps/index.jsx',
      dest: util.format('%s/js', dest),
      outputName: util.format('%s.js', pkg.name)
    }]
  }
};
