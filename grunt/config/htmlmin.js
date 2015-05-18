'use strict';

module.exports = {
    dist: {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },
        files: {
            '<%= config.dist %>/index.html': '.tmp/index.html'
        }
    }
};
