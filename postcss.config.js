/*
* @Author: inksmallfrog
* @Date:   2017-04-26 19:41:07
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 14:31:44
*/

'use strict';
module.exports = {
  plugins: [
    require('postcss-import')({
        from: './src/styles'
    }),
    require('postcss-cssnext')({ /* ...options */ })
  ]
}
