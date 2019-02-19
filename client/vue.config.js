
const path = require('path');

module.exports = {
    /**
     * This is where the application will be built to
     */
    outputDir: path.resolve(__dirname, '../server/public'),
    /**
     * The proxys for the backend.
     */
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            },
            '/auth': {
                target: 'http://localhost:5000'
            }
        }
    }
};
