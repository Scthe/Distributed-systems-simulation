'use strict';

module.exports = {
    options: {},
    css: {
        src: '.tmp/styles/*.css', // random order ?
        dest: '.tmp/styles/main.concat.css',
    },
    generated: {
        src: [
            'bower_components/underscore/underscore.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/d3/d3.js',
            'app/scripts/main_d3.js',
            'app/scripts/main.js'
        ],
        // dest: '.tmp/scripts/main.concat.js'
        dest: '.tmp/scripts/main.js',
    }
};
