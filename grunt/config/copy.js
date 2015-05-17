'use strict';

module.exports = {
    dist: {
        // TODO this is not complete
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
                '*.{ico,png,txt}',
                '.htaccess',
                'images/{,*/}*.webp',
                '{,*/}*.html',
                'styles/fonts/{,*/}*.*',
                'scripts',
            ]
        }, {
            expand: true,
            dot: true,
            cwd: '.',
            src: ['bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*'],
            dest: '<%= config.dist %>'
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
