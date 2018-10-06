const path = require('path');
const webpackNodeExternal = require('webpack-node-externals');

const config = {
  entry: { appBundle: './app.js' },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
  },
  target: 'node',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  externals: [webpackNodeExternal()],
  node: {
    __dirname: false,
  },
};
module.exports = config;
