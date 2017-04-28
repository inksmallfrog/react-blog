/*
* @Author: inksmallfrog
* @Date:   2017-04-28 07:17:54
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 21:16:19
*/

'use strict';
const path = require('path'),
      webpack = require('webpack'),
      baseConfig = require('./base'),
      defaultSettings = require('./default');

// Add needed plugins here

let config = Object.assign({}, baseConfig, {
    entry: [
        'whatwg-fetch',
        'webpack-hot-middleware/client?reload=true',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../src/app')
    ],
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.rules.push({
    test: /\.jsx?$/,
    include: path.join(__dirname, '/../src'),
    use:[
        'react-hot-loader',
        'babel-loader'
    ]
});

module.exports = config;
