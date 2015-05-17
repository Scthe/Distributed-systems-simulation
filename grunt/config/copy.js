'use strict';

module.exports = {
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '.tmp',
            src: [
                '*.{ico,png,txt}', // f.e. favicon
                'images/{,*/}*.*', // ALL images
                '{,*/}*.html', // loose html files
                'styles/fonts/{,*/}*.*' // fonts
            ]
        }]
    },
    moveToDist: {
        // TODO use rev instead
        files: [{
            expand: true,
            dot: true,
            cwd: '.tmp',
            dest: '<%= config.dist %>',
            src: [
                'images/{,*/}*.*',
                '{,*/}*.html', // loose html files
                'styles/fonts/{,*/}*.*', // fonts
                'styles/main.css',
                'scripts/main.js'
            ]
        }]
    },
    styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
    },
    CSSLibs: {
        // manually copy .css files to .scss so that we can
        // easily @import them in main.scss
        files: [{
            expand: true,
            flatten: true,
            cwd: './bower_components',
            src: [
                'normalize.css/normalize.css',
                'skeleton/css/skeleton.css'
            ],
            dest: '.tmp/styles/vendor',
            ext: '.scss'
        }]
    }
};
