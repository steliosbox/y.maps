const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const loaders = require('./webpack.config.loaders')();

module.exports = (prodaction) => {
    
    loaders.push({
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: "css-loader",
                options: {
                    minimize: prodaction,
                    sourcemap: !prodaction
                }
            }, {
                loader: "sass-loader"
            }]
        })
    });
    
    return {
        entry: {
            'main': './source/index.js'
        },
    
        output: {
            path: __dirname + '/dist',
            filename: '[name].bundle.js'
        },
    
        module: {
            loaders
        },
    
        plugins: [
            new CleanWebpackPlugin(['dist']),
        
            new HtmlWebpackPlugin({
                title: 'Custom template about',
                template: './source/index.hbs',
                minify: {
                    collapseWhitespace: prodaction
                },
                hash: true
            }),

            new ExtractTextPlugin({
                filename: 'style.css'
            }),
            
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common' // Specify the common bundle's name.
            })
        ]
    }
};
