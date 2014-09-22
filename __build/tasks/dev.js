'use strict';

var gulp = require('gulp');
var app = require('connect')();
var http = require('http');
var serveStatic = require('serve-static');
var config = require('../config');

gulp.task('dev', ['watch'], function() {
  app.use(serveStatic(config.dest));
  return http.createServer(app).listen(config.port);
});
