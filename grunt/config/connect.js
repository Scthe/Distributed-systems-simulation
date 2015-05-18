'use strict';

module.exports = {
    options: {
        open: true,
        hostname: 'localhost'
    },
    livereload: {
        options: {
            port: 9000,
            livereload: 35729,
            base: [
                '.', // for bower_components
                '<%= config.app %>',
                '<%= config.dev %>'
            ]
        }
    },
    dist: {
        options: {
            base: '<%= config.dist %>',
            port: 9005,
            keepalive: true,
            livereload: false
        }
    }
};
