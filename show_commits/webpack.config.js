var webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'react-hot-loader!babel-loader'
        },
        {
            test: /\.css$/,
            //loader: ExtractTextPlugin.extract("css-loader")
            loaders: ['style-loader', 'css-loader']
        }]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        path:  __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
        //, new ExtractTextPlugin("styles.css"),
    ]
};
