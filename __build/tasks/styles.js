'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var handleErrors = require('../util/handleErrors');
var config = require('../config').styles;
var rename = require('gulp-rename');
var prefix = require('gulp-autoprefixer');

gulp.task('styles', ['images'], function() {
  return gulp.src(config.src)
    .pipe(less())
    .pipe(prefix(config.prefixer))
    .pipe(rename(config.outputName))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
