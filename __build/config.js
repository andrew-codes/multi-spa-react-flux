'use strict';
var util = require('util');
var pkg = require('../package.json');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var pageApps = getPageApps('./../__apps/pages');

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
        outputApps: pageApps,
        src: '__web/index.html.mustache',
        dest: dest
    },
    styles: {
        src: '__styles/index.less',
        dest: util.format('%s/css', dest),
        outputName: util.format('%s.css', pkg.name),
        prefixer: {
            browsers: ['last 2 versions']
        }
    },
    images: {
        src: '__styles/images/**/*.*',
        dest: util.format('%s/css', dest)
    },
    scripts: {
        debug: true,
        extensions: ['.jsx', '.coffee', '.js'],
        transforms: [
            ['coffeeify']
        ],
        bundleConfigs: pageApps.map(function(pageApp) {
            return {
                entries: util.format('./__apps/pages/%s.js', pageApp),
                dest: util.format('%s/%s/js', dest, pageApp),
                outputName: util.format('%s.js', pageApp)
            };
        })
    }
};

function getPageApps(path) {
    return fs.readdirAsync('__apps/pages')
        .map(function(path) {
            return path.toString().substr(0, path.length - 3);
        });
}
