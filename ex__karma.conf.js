//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './app',

        files: [
            '../node_modules/angular/angular.js',
            '../node_modules/angular-animate/angular-animate.js',
            '../node_modules/angular-route/angular-route.js',
            '../node_modules/angular-aria/angular-aria.js',
            '../node_modules/angular-material/angular-material.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            'app.js',
            // '**/*.module.js',
            // '*!(.module|.spec).js',
            // '!(lib)/**/*!(.module|.spec).js',
            'tests/**/*.spec.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // Continues Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]

    });
};
