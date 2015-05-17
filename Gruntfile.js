/*global module, require*/ // node stuff

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config = {
        app: 'app',
        // dev: '.tmp/dev',
        dev: '.tmp',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,
        autoprefixer: require('./grunt/config/autoprefixer'),
        clean: require('./grunt/config/clean'),
        concat: require('./grunt/config/concat'),
        concurrent: require('./grunt/config/concurrent'),
        connect: require('./grunt/config/connect'),
        copy: require('./grunt/config/copy'),
        cssmin: require('./grunt/config/cssmin'),
        filerev: require('./grunt/config/filerev'),
        htmlmin: require('./grunt/config/htmlmin'),
        jade: require('./grunt/config/jade'),
        jshint: require('./grunt/config/jshint'),
        sass: require('./grunt/config/sass'),
        uglify: require('./grunt/config/uglify'),
        usemin: require('./grunt/config/usemin'),
        useminPrepare: require('./grunt/config/usemin'),
        watch: require('./grunt/config/watch')
    });


    /** run jshint only on changed file */
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('jshint.all.src', filepath);
    });


    /** livereload */
    grunt.registerTask('default', function() {
        grunt.task.run([
            'clean:server',
            'copy:CSSLibs',
            'concurrent:server',
            'autoprefixer',
            'jade',
            'connect:livereload',
            'watch'
        ]);
    });

    /** build page and open it in browser */
    grunt.registerTask('build:server', ['build', 'connect:dist:keepalive']);

    // grunt.registerTask('dbg', function() {
    // console.log('hi !');
    // console.log(grunt.filerev.summary);
    // });

    grunt.registerTask('css:dist', [
        'copy:CSSLibs',
        'sass:dist',
        'copy:styles',
        'autoprefixer',
        'concat:css',
        'cssmin:dist'
    ]);

    grunt.registerTask('js:dist', [
        'concat:jsDist',
        'uglify:dist',
        // or:
        // 'concat:jsDistAsFinalStep'
    ]);

    /**
     * TODO rev
     * TODO concurrent
     */
    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'jade',
        'useminPrepare',
        'css:dist',
        'js:dist',
        'copy:dist',
        // 'filerev',
        // 'dbg',
        'usemin',
        'htmlmin',
        'copy:moveToDist'
    ]);

};
