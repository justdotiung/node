const webpack = require('webpack');
const join = require('path').join;

module.exports = {
  mode: 'development',
  entry:  './src/index.js',
  output: {
    path: join(__dirname,'/dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {

  },
  plugins: [],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};