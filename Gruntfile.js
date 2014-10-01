module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	var options = {
		livereload : {
			port : 8008,
			key : grunt.file.read('server/ssl/private.key'),
			cert : grunt.file.read('server/ssl/ssl.crt')
		}
	};

	grunt.initConfig({
		sass : {
			dist : {
				options : {
					style: 'expanded'
				},
				files : {
					'client/css/style.css' : 'client/css/style.scss'
				}
			}
		},
		watch : {
			html : {
				options : options,
				files : ['client/html/**/*.html']
			},
			js : {
				options : options,
				files : ['client/js/**/*.js']
			},
			sass : {
				options : options,
				tasks : ['sass'],
				files : ['client/css/style.scss']
			}
		}
	});

	grunt.registerTask('server', function() {
		grunt.log.writeln('Starting the ATLAS 4 server on port 8000');
		require('./start.js');
	});
}