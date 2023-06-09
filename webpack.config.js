const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: 'development',
    //指定入口文件
    entry:'./src/index.ts',

    //指定打包文件所在目录
    output: {
        path: path.resolve(__dirname,'dist'),
        //打包后的文件
        filename:'bundle.js'
    },

    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //test指定的时规则生效的文件
                test: /\.ts$/,
                //要使用的loader
                use: 'ts-loader',
                //要排除的文件
                exclude: /node_moudules/
            },
            //设置less文件的处理
            {
                test: /\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:"postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins:[
                                    ["postcss-preset-env",
                                    {
                                        browsers: 'last 2 version',
                                    }]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: '自定义title',
            template: "./src/index.html",
        }),
        
    ],
    //用来设置引用模块
    resolve: {
        extensions: ['.ts','.js'],
    }
}