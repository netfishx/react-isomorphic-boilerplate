'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/client/app',
    output: {
        path: path.join(__dirname, '/public/js/'),
        filename: 'app.min.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel-loader?stage=0&externalHelpers'], exclude: /node_modules/ }
        ]
    }
};
