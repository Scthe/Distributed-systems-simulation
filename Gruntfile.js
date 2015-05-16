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
        concurrent: require('./grunt/config/concurrent'),
        connect: require('./grunt/config/connect'),
        copy: require('./grunt/config/copy'),
        jade: require('./grunt/config/jade'),
        jshint: require('./grunt/config/jshint'),
        rev: require('./grunt/config/rev'),
        sass: require('./grunt/config/sass'),
        watch: require('./grunt/config/watch')
    });


    /** run jshint only on changed file */
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('jshint.all.src', filepath);
    });


    grunt.registerTask('default', function(target) {
        if (target === 'dist') {
            grunt.task.run(['build', 'connect:dist:keepalive']);
        } else {
            grunt.task.run([
                'clean:server',
                'concurrent:server',
                'autoprefixer',
                'jade',
                'connect:livereload',
                'watch'
            ]);
        }
    });

    // grunt.registerTask('build:server', [ // run server and open page

    grunt.registerTask('build', [
        'clean:dist',
        'jade',
        // 'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        // 'concat',
        // 'cssmin',
        // 'uglify',
        'copy:dist',
        'rev',
        // 'usemin',
        // 'htmlmin',
    ]);

};
