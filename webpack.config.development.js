const merge = require('webpack-merge');
const common = require('./webpack.config.js')(false);

module.exports = merge(common, {
    devServer: {
        contentBase: 'source/',
        compress: true,
        stats: 'errors-only',
        host: 'localhost',
        port: '3001',
        inline: true,
        open: true
    },

    devtool: 'cheap-inline-module-source-map',
});
