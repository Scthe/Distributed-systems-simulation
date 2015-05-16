'use strict';

module.exports = {
    compile: {
        options: {
            data: {
                debug: false
            },
            pretty: true
        },
        files: [{
            expand: true,
            cwd: '<%= config.app %>',
            src: '**/*.jade',
            dest: '<%= config.dev %>',
            ext: '.html'
        }]
    }
};
