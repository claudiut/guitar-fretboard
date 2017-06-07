const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR   = path.resolve(__dirname, 'src/client/app');

module.exports = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'app.js',  // this exports the final .js file
        publicPath: BUILD_DIR
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
                test: /\.scss|.sass$/,
                use: ExtractTextPlugin.extract({
                     fallback: 'style-loader',
                     use: ['css-loader', 'sass-loader']
                })
             }
        ]
    },
    plugins: [
        new ExtractTextPlugin("app.css"),
    ]
}