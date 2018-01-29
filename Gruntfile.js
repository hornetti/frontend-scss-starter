module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/sass/',
					src: ['*.scss'],
					dest: 'build/css/',
					ext: '.css'
				}]
			}
		},
		htmlmin: {
		    dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'build/index.html': 'src/index.html',
				}
			},
		},
		autoprefixer: {
			compile: {
				files: {
				  'build/css/style.css': 'build/css/style.css'
				},
			},
		},
		cssmin: {
			clean: {
				files: {
				  'build/css/style.css': 'build/css/style.css'
				}
			}
		},
		uglify: {
			my_target: {
				files: {
				'build/js/function.min.js': ['src/js/function.js']
				}
			}
		},
		watch: {
			sass: {
				files: [ 'src/sass/*.scss' ],
				tasks: ['sass', 'autoprefixer', 'cssmin', 'htmlmin', 'uglify']
			},
		},
		browserSync: {
			bsFiles: {
				src: [ 'build/css/*.css', 'build/js/*.js', 'build/*.html']
			},
			options: {
				watchTask: true,
				server: {
					baseDir: 'build'
				},
			},
		},
	});

	// Load grunt plugins.
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// configurare uglifyjs per la minificazione del javascript
	grunt.registerTask('start', ['default', 'browserSync', 'watch']);

	// rivedere il registerTask start per mancanza di sincronizzazione dei file html
	grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'htmlmin', 'uglify']);
};