'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var handleErrors = require('../util/handleErrors');
var config = require('../config').styles;
var rename = require('gulp-rename');

gulp.task('styles', ['images'], function() {
  return gulp.src(config.src)
    .pipe(less())
    .pipe(rename(config.outputName))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
