/*
* @Author: inksmallfrog
* @Date:   2017-04-26 16:23:45
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 17:51:54
*/

'use strict';
const koa = require('koa'),
      app = new koa(),
      serveStatic = require('koa-static');
app.use(serveStatic(__dirname+"/dist"), {
    index: 'index.html'
});
app.use(serveStatic(__dirname+"/dist/passages"));

const webpack = require('webpack'),
      webpackConfig = require('./webpack.config'),
      compiler = webpack(webpackConfig),
      webpackDevMiddleware = require('koa-webpack-dev-middleware'),
      webpackHotMiddleware = require('koa-webpack-hot-middleware');

app.use(webpackDevMiddleware(compiler,  webpackConfig.devServer));
app.use(webpackHotMiddleware(compiler));

app.listen(3000);
