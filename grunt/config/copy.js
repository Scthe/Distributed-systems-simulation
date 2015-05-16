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
    }
};
