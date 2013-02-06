module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		qunit: {
			dist: 'http://localhost:9537/test/widget.html'
		},

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
				tasks: 'jshint:dist'
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
				dest: 'dist/'
			}
		},

		jshint: {
			gruntfile: 'Gruntfile.js',
			dist: 'lib/**/*.{js,json}',
			test: 'test/**/*.js',

			options: {
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				quotmark: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: false,
				regexdash: true,
				smarttabs: true,
				strict: false,
				node: true,
				browser: true,

				globals: {
					_gittip: true,
					Gittip: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task.
	grunt.registerTask('default', ['jshint', 'connect', 'qunit', 'uglify']);
	grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
};
