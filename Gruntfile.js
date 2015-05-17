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
        jade: require('./grunt/config/jade'),
        jshint: require('./grunt/config/jshint'),
        filerev: require('./grunt/config/filerev'),
        sass: require('./grunt/config/sass'),
        uglify: require('./grunt/config/uglify'),
        useminPrepare: require('./grunt/config/usemin'),
        usemin: require('./grunt/config/usemin'),
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

    /**
     * 
     * TODO uglify
     * TODO rev
     * TODO htmlmin
     * TODO concurrent
     */
    grunt.registerTask('build', [
        // preparations
        'clean:dist',
        'jshint',
        // html
        'jade',
        'useminPrepare',
        // css
        'copy:CSSLibs',
        'sass:dist',
        'copy:styles',
        'autoprefixer',
        'concat:css',
        'cssmin:dist',
        // js
        'concat:generated',
        // 'uglify:generated',
        // other files
        'copy:dist',
        // finalize
        // 'filerev',
        // 'dbg',
        // 'htmlmin',
        'usemin',
        'copy:moveToDist'
    ]);

};
