/* globals require, __dirname, module */

var path = require('path');

const config = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname),
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
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    }
};

module.exports = config;
