'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Mustache = require('mustache');

var config = {
  src: './__apps',
  dest: './public',
  styles: {
    src: 'styles/index.less',
    dest: '../css/index.css'
  },
  appSettings: {
    scripts: {
      src: 'app/index.js',
      dest: 'js',
    }
  }
};

gulp.task('dev', ['build'], function() {
  return connect.server({
    root: config.dest,
    livereload: true
  });
});

gulp.task('build', ['assemble-html'], function() {});

gulp.task('assemble-html', ['clean', 'build-apps-configurations'], function() {
  return fs.readFileAsync(createUrlFrom([config.src, 'index.html.mustache']))
    .then(function(templateContents) {
      return new Promise(function(resolve) {
        var apps = [];
        config.apps.forEach(function(app) {
          apps.push({
            name: app.name,
            fileContents: Mustache.render(templateContents.toString(), app)
          });
        });
        resolve(apps);
      });
    })
    .then(function(apps) {
      apps.forEach(function(app) {
        fs.mkdirAsync(config.dest)
          .thenReturn(config.dest)
          .then(function(destDirPath) {
            var fullPath = createUrlFrom([destDirPath, app.name]);
            return fs.mkdirAsync(fullPath).thenReturn(fullPath);
          })
          .then(function(dirName) {
            return fs.writeFileAsync(createUrlFrom([dirName, 'index.html']), app.fileContents, "utf-8");
          });
        return apps;
      });
    })
});

gulp.task('clean', [], function() {
  return gulp.src([config.dest], {
      read: false
    })
    .pipe(clean());
});

gulp.task('build-apps-configurations', [], function() {
  config.apps = [];
  return fs.readdirAsync(config.src)
    .filter(function(file) {
      return fs.statAsync(createUrlFrom([config.src, file])).then(function(fileName) {
        return fileName.isDirectory();
      });
    })
    .map(function(directoryName) {
      config.apps.push({
        name: directoryName,
        scripts: {
          src: createUrlFrom([config.src, config.appSettings.scripts.src]),
          dest: createUrlFrom([config.appSettings.scripts.dest, directoryName + '.js'])
        },
        styles: {
          dest: config.styles.dest
        }
      });
    });
});

function createUrlFrom(urlFragments) {
  return urlFragments.join('/');
}
