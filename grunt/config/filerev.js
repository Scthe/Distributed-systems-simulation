'use strict';

module.exports = {
    options: {
        algorithm: 'md5',
        length: 8
    },
    assets: {
        src: [
            '.tmp/images/{,*/}*.*', // ALL images
            '.tmp/styles/main.css',
            '.tmp/scripts/main.js'
        ],
        // dest: '<%= config.dist %>'
    }
};
