'use strict';

module.exports = {
    options: {
        includePaths: [
            'bower_components',
            '.tmp/styles/vendor'
        ]
    },
    dist: {
        files: [{
            expand: true,
            cwd: '<%= config.app %>/styles',
            src: ['*.scss'],
            dest: '.tmp/styles',
            ext: '.compiled.css'
        }]
    },
    server: {
        files: [{
            expand: true,
            cwd: '<%= config.app %>/styles',
            src: ['*.scss'],
            dest: '<%= config.dev %>/styles',
            ext: '.css'
        }]
    }
};
