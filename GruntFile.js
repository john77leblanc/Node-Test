module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ["*.js", "lib/*.js"],
            options: {
                esnext: true,
                globals: {
                    jQuery: true
                }
            }
        },
        less: {
            production: {
                files: {
                    "public/css/style.css": ["less/*.less"]
                }
            }
        },
        autoprefixer: {
            single_file: {
                src: "public/css/style.css",
                dest: "public/css/style.css"
            }
        },
        watch: {
            css: {
                files: ["less/*.less"],
                tasks: ["css"]
            },
            scripts: {
                files: ["app-client.js","lib/*.js"],
                tasks: ["jshint"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("css", ["less", "autoprefixer"]);

    grunt.registerTask("default", ["jshint", "css"]);
};