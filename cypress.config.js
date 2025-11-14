const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://apexfusion.com/login',
        supportFile: false,
        specPattern: 'cypress/integration',

        // Timeout configuration
        defaultCommandTimeout: 8000,        // Increased from default 4000ms
        pageLoadTimeout: 60000,             // Time to wait for page load
        requestTimeout: 8000,               // Time to wait for XHR requests

        // Test retry configuration
        retries: {
            runMode: 2,      // Retry failed tests 2 times in CI
            openMode: 0      // Don't retry in interactive mode
        },

        // Screenshot configuration
        screenshotOnRunFailure: true,
        screenshotsFolder: 'cypress/screenshots',

        // Video configuration (disabled via CLI, but configured here)
        videosFolder: 'cypress/videos',
        videoCompression: 32,

        // Viewport configuration
        viewportWidth: 1280,
        viewportHeight: 720,

        // Wait for animations/transitions to complete
        waitForAnimations: true,
        animationDistanceThreshold: 5
    },
})