/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            name: "large",
            width: 720,
            quality: 30,
            suffix: "-1x"
          },
        {
          name: "small",
          width: 480,
          quality: 30,
          suffix: "-1x"
        },
        {
          name: "large",
          width: 800,
          quality: 90,
          suffix: "-2x"
        },
      {
        name: "small",
        width: 480,
        quality: 90,
        suffix: "-2x"
      }]
          },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'img_reduced/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img_reduced']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    // copy: {
    //   dev: {
    //     files: [{
    //       expand: true,
    //       src: 'images_src/fixed/*.{gif,jpg,png}',
    //       dest: 'images/'
    //     }]
    //   },
    // },

    cssmin: {
        my_target: {
            src: 'views/css/bootstrap-grid.css',
            dest: 'views/css/bootstrap-grid.min.css'
        }
    }
  });

  grunt.loadNpmTasks('grunt-responsive-images');
  // cssmin from: https://www.npmjs.com/package/grunt-css
  grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-css');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images', 'cssmin']); //, 'copy' omitted
};