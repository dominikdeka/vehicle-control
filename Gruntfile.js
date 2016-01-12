module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            bower: 'bower_components/'
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'src',
                src: ['**/*.html'],
                dest: 'public/'
            }
        },
        uglify: {
            js: {
                options: {
                    report: 'min'
                },
                files: {
                    'public/js/scripts.min.js': [
                        '<%= dirs.bower %>jquery/jquery.min.js', 
                        '<%= dirs.bower %>modernizr/modernizr.js', 
                        '<%= dirs.bower %>bootstrap/dist/js/bootstrap.min.js',
                        'src/js/app.js' 
                    ]
                }
            }
        },
        less: {
            dist: {
                options: {
                  paths: ['<%= dirs.bower %>'],
                  cleancss: true
                },
                files: {
                  "public/css/main.css": "src/less/main.less"
                }
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: '<%= dirs.bower %>font-awesome/fonts', src: ['*'], dest: 'public/fonts', filter: 'isFile'}
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [ 'copy', 'uglify', 'htmlmin', 'less']);

};
