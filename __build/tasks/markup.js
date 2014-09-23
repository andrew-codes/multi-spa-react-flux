'use strict';

var gulp = require('gulp');
var config = require('../config').markup;
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var util = require('util');
var Mustache = require('mustache');
var cssConfig = require('../config').styles;
var mkdir = Promise.promisifyAll(require('mkdirp'));

gulp.task('markup', function() {
    return fs.readFileAsync(config.src)
        .then(function(fileContents) {
            return fileContents.toString();
        })
        .then(function(fileContents) {
            config.outputApps.then(function(apps) {
                apps.forEach(function(app) {
                    var view = {
                        css: util.format('../css/%s', cssConfig.outputName),
                        js: util.format('js/%s.js', app)
                    };
                    var contents = Mustache.render(fileContents, view);
                    var outputDir = util.format('%s/%s', config.dest, app);
                    mkdir.mkdirpAsync(outputDir)
                        .thenReturn(outputDir)
                        .then(function(dirName) {
                            fs.writeFileAsync(util.format('%s/index.html', dirName), contents, 'utf-8');
                        });
                });
            });
        });
});
