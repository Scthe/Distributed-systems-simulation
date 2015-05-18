'use strict';

module.exports = {
    options: {
        report: 'min'
    },
    dist: {
        files: [{
            src: ['.tmp/scripts/main.concat.js'],
            dest: '.tmp/scripts/main.js'
        }]
    },
    fast: {
        files: [{
            src: ['.tmp/scripts/main.concat.js'],
            dest: '.tmp/scripts/main.js'
        }],
        options: {
            compress: false
        }
    }
};
