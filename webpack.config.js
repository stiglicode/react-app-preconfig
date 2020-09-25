require('dotenv').config();

const path = require('path');
 
module.exports = {
    mode: process.env.WEBPACK_MODE,
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },  // [project folder]/public/bundle.js
    module: {
        rules: [{
            loader: 'babel-loader',  // transpile JavaScript files using Babel and webpack
            test: /\.js$/,  // regular expression -> js files
            exclude: /node_modules/
        }]
    },
    devtool: 'cheap-module-eval-source-map',  // source-map
    devServer: {
        contentBase: path.join(__dirname, 'public')  // [project folder]/public
    }
};