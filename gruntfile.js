module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    /* Browserify client-side modules */
    browserify: {
      dist: {
        files: {
          "public/bundle.js": ["public/app/*.js"]
        }
      }
    },

    /* Watch for JavaScript changes to automatically Browserify */
    watch: {
      scripts: {
        files: ["public/app/*.js"],
        tasks: ["browserify"],
        options: {
          debounceDelay: 1000
        }
      }
    },

    /* JSHint for JS code quality */
    jshint: {
      all: ['public/app/*/*.js']
    },
    
    /* Optimize images */
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: "public/assets/img/raw/",
          src: ["*.{png,jpg,gif}"],
          dest: "public/assets/img/"
        }]
      }
    },

    /* Semantic versioning */
    bump: {
      options : {
        files: ["package.json"],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: "v%VERSION%",
        tagMessage: "Version %VERSION%",
        push: false
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-livereload");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-bump");

  grunt.registerTask("default", [
    "jshint"
  ]);
};
