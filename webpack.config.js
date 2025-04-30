const path = require('node:path');

module.exports = {
    mode: 'development',
    entry: "./src/client.js",
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            }
        ]
    }
}