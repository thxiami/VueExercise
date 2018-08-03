var webpack = require('webpack');
var  HtmlwebpackPlugin = require('html-webpack-plugin');
var  ExtractTextPlugin = require('extract-text-webpack-plugin');  // 分离项目中的 css 文件
var  merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js'); // 引入之前的 config 文件

//
webpackBaseConfig.plugins = {};
module.exports = merge(webpackBaseConfig, {

})