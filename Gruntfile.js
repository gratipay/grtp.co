module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 9537,
                    base: '.'
                }
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile %>',
                tasks: 'jshint:gruntfile'
            },

            dist: {
                files: 'lib/**/*',
                tasks: ['jshint:dist', 'uglify:dist', 'minjson:dist', 'htmlmin:dist']
            },

            test: {
                files: ['<%= jshint.test %>', 'test/**/*.html'],
                tasks: ['jshint:test', 'connect', 'dalek']
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            dist: {
                expand: true,
                cwd: 'lib/',
                src: '**/*.js',
                dest: 'www/'
            }
        },

        minjson: {
            dist: {
                expand: true,
                cwd: 'lib/',
                src: '**/*.json',
                dest: 'www/'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true
                },

                expand: true,
                cwd: 'lib/',
                src: '**/*.html',
                dest: 'www/'
            }
        },

        jshint: {
            gruntfile: 'Gruntfile.js',
            dist: 'lib/**/*.{js,json}',
            test: 'test/**/*.{js,json}',

            options: {
                jshintrc: '.jshintrc',

                globals: {
                    Gittip: true,
                    _gttp: true,

                    // JSHint doesn't like XDomainRequest otherwise
                    XDomainRequest: true
                }
            }
        },

        dalek: {
            test: 'test/**/*.js',

            options: {
                reporter: ['console']
            }
        }
    });

    grunt.loadNpmTasks('grunt-minjson');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-dalek');

    grunt.registerTask('default', ['test', 'minify']);
    grunt.registerTask('minify', ['uglify', 'minjson', 'htmlmin']);
    grunt.registerTask('test', ['jshint', 'connect', 'dalek']);
};
