var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var config = {
    entry: {
        main: "./main",
    },
    output: {
        path: path.join(__dirname, './dist'),  // 打包文件的输出目录
        publicPath: '/dist/',  // 静态资源的引用路径前缀？？
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // 处理 .vue 文件内的 style
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback:'vue-style-loader',
                        })
                    }
                }
            },
            {
                // Babel 转码，可以将 ES6 代码转换为低版本
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // 借助插件来将各个 css 文件打包成 1 个
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader',
                })
            },
            {
                // 还是没搞太清楚
                // url-loader 内封装了 file-loader
                // file-loader 作用是在打包后可以给出正确的文件引用路径
                // url-loader 的作用是可以设置一个文件大小的限制，小于限制时直接转码，大于时调用 file-loader
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    plugins: [
        // 重命名提取打包后的 css 文件
        new ExtractTextPlugin("main.css"),
    ]
};

module.exports = config;
