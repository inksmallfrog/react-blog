/*
* @Author: inksmallfrog
* @Date:   2017-04-28 07:10:01
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 20:37:18
*/

/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';
const path = require('path'),
      srcPath = path.join(__dirname, '../src'),
      dfltPort = 8080;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules(){
    return{
        rules:[
            {
                test: /\.jsx?$/,
                include: srcPath,
                enforce: 'pre',
                use: [
                    'eslint-loader'
                ]
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                 test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
                 use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[md5:hash:hex:7].[ext]'
                        }
                    }
                 ]
            }
        ]
    };
}

module.exports = {
    srcPath: srcPath,
    publicPath: './assets/',
    port: dfltPort,
    getDefaultModules: getDefaultModules
};
