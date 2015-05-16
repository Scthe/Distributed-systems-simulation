'use strict';

module.exports = {
    server: [
        'sass:server',
        'copy:styles'
    ],
    test: [
        'copy:styles'
    ],
    dist: [
        'sass',
        'copy:styles',
        // 'imagemin',
        // 'svgmin'
    ]
};
