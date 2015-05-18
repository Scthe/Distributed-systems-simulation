'use strict';

module.exports = {
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    },
    src: [
        '<%= config.app %>/scripts/{,*/}*.js'
    ],
    project: [
        './Gruntfile.js',
        './grunt/{,*/}*.js'
    ]
};
