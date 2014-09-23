'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var config = require('../config').scripts;
var reactify = require('reactify');
var Promise = require('bluebird');

gulp.task('scripts', function(callback) {
    var bundleQueue = 0;
    var count = 0;
    var browserifyThis = function(bundleConfig) {
        return new Promise(function(resolve) {
            var bundler = browserify({
                cache: {},
                packageCache: {},
                fullPaths: true,
                entries: bundleConfig.entries,
                transforms: config.transforms,
                debug: config.debug
            });
            bundler.transform(reactify);

            var bundle = function() {
                bundleLogger.start(bundleConfig.outputName);
                return bundler
                    .bundle()
                    .on('error', handleErrors)
                    .pipe(source(bundleConfig.outputName))
                    .pipe(gulp.dest(bundleConfig.dest))
                    .on('end', reportFinished);
            };
            if (global.isWatching) {
                bundler = watchify(bundler);
                bundler.on('update', bundle);
            }

            function reportFinished() {
                bundleLogger.end(bundleConfig.outputName);
                if (bundleQueue) {
                    bundleQueue--;
                    resolve(count+1);
                    if (bundleQueue === 0) {
                        callback();
                    }
                }
            };
            bundle();
        });
    };
    config.bundleConfigs
        .then(function(bundleConfigs) {
            bundleQueue = bundleConfigs.length;
            for (var i = count; i < bundleConfigs.length-1; i++) {
                browserifyThis(bundleConfigs[i]).then(function(queueIndex) {
                    return browserifyThis(bundleConfigs[queueIndex]);
                });
            }
        });
});
