'use strict';

module.exports = {
    options: {
        includePaths: [
            'bower_components'
        ]
    },
    dist: {
        files: [{
            expand: true,
            cwd: '<%= config.app %>/styles',
            src: ['*.scss'],
            dest: '.tmp/styles',
            ext: '.css'
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
