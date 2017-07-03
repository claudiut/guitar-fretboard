const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'public');
const APP_DIR   = path.resolve(__dirname, 'src');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'app.bundle.js',  // this exports the final .js file
    // publicPath: DIST_DIR
  },
  module: {
    rules: [
      {
        test : /\.jsx?/,
        loader : 'babel-loader',
        include : APP_DIR,
      },
          
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
           fallback: 'style-loader',
           use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  
  devServer: {
    // contentBase: DIST_DIR,
    compress: true,
    stats: 'errors-only',
    // port: 9000,
    // open: true
  },
  
  plugins: [
    // https://github.com/webpack-contrib/extract-text-webpack-plugin
    // using this plugin we can extract the text (such as styles) and write them to files
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    }),
    
    // https://github.com/jantimon/html-webpack-plugin
    // with this plugin we can minify the html, hash the assets for cache busting, write the index.html starting from a template, etc.
    new HtmlWebpackPlugin({
      title: 'Guitar Fretboard',
      filename: DIST_DIR + '/index.html',
      template: './index.ejs',
      minify: {
        collapseWhitespace: true,
      },
      hash: true
    })
  ]
}