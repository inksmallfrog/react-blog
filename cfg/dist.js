/*
* @Author: inksmallfrog
* @Date:   2017-04-28 07:37:51
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 20:37:45
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
        path.join(__dirname, '../src/app')
    ],
    cache: false,
    devtool: 'sourcemap',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.rules.push({
  test: /\.(js|jsx)$/,
  include: [].concat(
    [ path.join(__dirname, '/../src') ]
  ),
  use: [
    'babel-loader'
  ]
});

module.exports = config;
