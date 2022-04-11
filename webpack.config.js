const path = require('path');

const HtmlWeboackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

console.log('Mode: ', process.env.NODE_ENV); // eslint-disable-line no-console
module.exports = {
    mode,
    entry: './src/index.tsx',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime'],
                },
                exclude: /node_modules/,
            },
            { test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWeboackPlugin({
            publicPath: '/',
            template: path.resolve(__dirname, 'src', 'static', 'index.html'),
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        hot: true,
        port: 3000,
    },
};
