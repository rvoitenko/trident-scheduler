const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://apexfusion.com/login',
        supportFile: false,
        specPattern: 'cypress/integration'
    },
})