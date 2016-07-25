/* globals require, __dirname, module */

var path = require('path');
var nodeExternals = require('webpack-node-externals');
//var webpack = require('webpack');

const config = {
    entry: path.join(__dirname, 'index.js'),
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js'],
        root: [
            path.join(__dirname)
        ],
        modulesDirectories: [ 'node_modules']
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules|bundle.js/
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    externals: [nodeExternals()]
};

module.exports = config;
