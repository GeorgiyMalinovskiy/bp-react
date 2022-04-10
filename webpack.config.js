const path = require('path');

const dotenv = require('dotenv');
const HtmlWeboackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new HtmlWeboackPlugin({
    publicPath: '/',
    template: path.resolve(__dirname, 'src', 'static', 'index.html'),
  }),
];

const config = dotenv.config();
const publicConfig = config?.parsed
  ? Object.entries(config.parsed).reduce((acc, [key, value]) => {
      if (/^PUBLIC_/.test(key)) acc[`process.env.${key}`] = JSON.stringify(value);
      return acc;
    }, {})
  : {};

if (publicConfig) plugins.push(new webpack.DefinePlugin(publicConfig));

const mode = process.env.NODE_ENV || 'development';

console.log('Mode: ', process.env.NODE_ENV); // eslint-disable-line no-console
module.exports = {
  mode,
  entry: './src/index.ts',
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
  plugins,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
};
