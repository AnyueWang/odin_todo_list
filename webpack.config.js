const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    devServer: {
        static: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf/i,
                type: 'asset/resource',
              },
        ]
    }
};