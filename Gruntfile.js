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
                files: '<%= jshint.dist %>',
                tasks: ['jshint:dist', 'uglify:dist', 'minjson:dist']
            },

            test: {
                files: '<%= jshint.test %>',
                tasks: 'jshint:test'
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

        jshint: {
            gruntfile: 'Gruntfile.js',
            dist: 'lib/**/*.{js,json}',
            test: 'test/**/*.{js,json}',

            options: {
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                quotmark: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: false,
                regexdash: true,
                smarttabs: true,
                strict: true,
                node: true,
                browser: true,

                globals: {
                    Gittip: true,
                    _gttp: true,

                    // JSHint doesn't like XDomainRequest otherwise
                    XDomainRequest: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-minjson');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['test', 'minify']);
    grunt.registerTask('minify', ['uglify', 'minjson']);
    grunt.registerTask('test', ['jshint']); //, 'connect', 'qunit']);
};
