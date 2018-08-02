var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        main: "./main",
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 借助插件来将各个 css 文件打包成 1 个
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader',
                })
                // use: [
                //     'style-loader',
                //     'css-loader',
                // ]
            },
        ]
    },
    plugins: [
        // 重命名提取打包后的 css 文件
        new ExtractTextPlugin("main.css"),
    ]
};

module.exports = config;
