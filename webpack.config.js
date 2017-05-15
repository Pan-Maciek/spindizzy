const path = require('path')

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app: './src/main.js'
    },
    module: {
        rules: [{
            test: /\.glsl$/,
            use: 'raw-loader'
        }]
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'main.bundle.js'
    }
}