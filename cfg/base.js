/*
* @Author: inksmallfrog
* @Date:   2017-04-28 07:04:26
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 21:45:51
*/

'use strict';
const path = require('path'),
      defaultSettings = require('./default');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: 'bundle.js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        contentBase: './src/',
        filename: 'bundle.js',
        publicPath: defaultSettings.publicPath,
        stats:{
            colors: true,
        },
        historyApiFallback: true,
        hot: true,
        noInfo: false,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            actions: `${defaultSettings.srcPath}/actions/`,
            stores: `${defaultSettings.srcPath}/stores/`,
            dispatcher: `${defaultSettings.srcPath}/dispatcher/`,
            components: `${defaultSettings.srcPath}/components/`,
            containers: `${defaultSettings.srcPath}/containers/`,
            styles: `${defaultSettings.srcPath}/styles/`,
            data: `${defaultSettings.srcPath}/data/`,
            tools:  `${defaultSettings.srcPath}/tools/`,
            config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
            'react/lib/ReactMount': 'react-dom/lib/ReactMount'
        }
    },
    module: {}
}
