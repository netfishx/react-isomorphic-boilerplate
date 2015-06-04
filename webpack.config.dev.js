'use strict';

var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');

module.exports = {
    devtool: 'inline-source-map',
    entry: ['webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/js/client/app'],
    output: {
        path: path.join(__dirname, '/public/js/'),
        filename: 'app.min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL)
        })
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loader: 'react-hot!babel?stage=0', exclude: /node_modules/},
            {test: /\.s?css$/, loader: 'style!css!postcss!sass'},
            {test: /\.(jpe?g|png|gif|svg)$/, loader: 'url?limit=100000'},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file"}
        ]
    },
    postcss: [autoprefixer]
};
