'use strict';

module.exports = {
    options: {
        report: 'min',
    },
    dist: {
        files: {
            '.tmp/styles/main.css': '.tmp/styles/main.concat.css'
        }
    }
};
