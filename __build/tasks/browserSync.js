'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('../config').browserSync;

gulp.task('browserSync', ['build'], function() {
  return browserSync(config);
});
