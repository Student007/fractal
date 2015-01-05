// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['public/src/js/**/*.js'] 
    },

    // annotate angular code first
    ngAnnotate: {
      goalpro: {  
        files: {
          'public/src/js/annotated.js': ['public/src/js/**/*.js'],
        }
      }
    },

    // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/src/js/annotated.js']
        }
      }
    },

    // CSS TASKS ===============================================================
    // process the sass files to style.css
    compass: {
      dist: {
        options: {
          sassDir: 'public/src/styles/',
          cssDir: 'public/dist/styles/'
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/styles/style.min.css': 'public/dist/styles/style.css'
        }
      }
    },

    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['public/src/styles/**/*.scss'],
        tasks: ['compass', 'cssmin']
      },
      js: {
        files: ['public/src/js/**/*.js'],
        tasks: ['jshint', 'ngAnnotate', 'uglify']
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['compass', 'cssmin', 'jshint', 'ngAnnotate', 'uglify', 'concurrent']);
};