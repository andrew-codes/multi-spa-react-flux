'use strict';

var gulp = require('gulp');
var config = require('../config').markup;
var server = require('connect').server;

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
