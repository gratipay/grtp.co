module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    useAvailablePort: true,
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
                tasks: ['jshint:dist', 'uglify:dist', 'htmlmin:dist']
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

        copy: {
            main: {
                cwd: 'lib/v1/blogger',
                expand: true,  // required for cwd
                src: '**/*',
                dest: 'www/v1/blogger/',
            },
        },

        jshint: {
            gruntfile: 'Gruntfile.js',
            dist: 'lib/**/*.{js,json}',
            test: 'test/**/*.{js,json}',

            options: {
                jshintrc: '.jshintrc',

                globals: {
                    Gratipay: true,
                    _grtp: true,

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

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-dalek');

    grunt.registerTask('default', ['test', 'build']);
    grunt.registerTask('build', ['uglify', 'htmlmin', 'copy']);
    grunt.registerTask('test', ['jshint', 'connect', 'dalek']);
};
