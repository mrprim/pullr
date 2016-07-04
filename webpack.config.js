var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: "./entry.js",
    output: {path: BUILD_DIR, filename: "bundle.js"},
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.less$/, loaders: ["style","css","less"]},
            {test : /\.jsx?/, include : APP_DIR, loader : 'babel'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery',jQuery: 'jquery'})
    ]
};