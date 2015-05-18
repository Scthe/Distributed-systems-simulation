'use strict';

module.exports = {
    options: {
        livereload: true
    },
    js: {
        files: ['Gruntfile.js', 'grunt/{,*/}*.js', '<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint']
    },
    gruntfile: {
        files: ['Gruntfile.js', 'grunt/{,*/}*.js'],
        options: {
            reload: true
        }
    },
    sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
    },
    styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
    },
    jade: {
        files: '<%= config.app %>/{,*/}*.jade',
        tasks: ['jade']
    },
    livereload: {
        files: [
            '<%= config.dev %>/styles/{,*/}*.css',
            '<%= config.dev %>/**/{,*/}*.html',
            '<%= config.app %>/images/{,*/}*'
        ],
        options: {
            livereload: '<%= connect.options.livereload %>'
        }
    }
};
