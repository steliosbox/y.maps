const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.js')(true);

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ]
});