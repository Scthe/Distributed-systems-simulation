'use strict';

module.exports = {
    generated: {
        files: [{
            // dest: '.tmp/js/main.uglify.js',
            // <%= config.dist %>/scripts/main.js
            dest: '.tmp/scripts/main.js',
            src: ['.tmp/scripts/main.concat.js']
        }],
        options:{
            compress:false,
            report: 'min'

        }
    }
};
