require('dotenv').config();

const path = require('path');
 
module.exports = {
    mode: process.env.WEBPACK_MODE,
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },  
    module: {
        rules: [
            {
                loader: 'babel-loader',  
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: 
                [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            },
        ]
    },
    devtool: 'cheap-module-eval-source-map', 
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};