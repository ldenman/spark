import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import csswring from 'csswring';
import autoprefixer from 'autoprefixer-core';

// for Bourbon & Neat to be added to style loader below
import bourbon from 'node-bourbon';
import neat from 'node-neat';
var bourbonNeatPaths = (a, b) => {
  return '?includePaths[]=' + encodeURIComponent(a.includePaths) +
         '&includePaths[]=' + encodeURIComponent(b.includePaths[1])
}

const config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, './app/stylesheets')]
  },
  postcss: [autoprefixer, csswring],
  module: {
    loaders: [
        {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass' + bourbonNeatPaths(bourbon, neat)
      }
    ]
  }
};

export default config;
