module.exports = function() {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        },
        {
            test: /\.hbs$/,
            loader: "handlebars-loader",
            query: {
                inlineRequires: '\/images\/'
            }
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader',
            exclude: /fonts/,
            options: {
                name: 'images/[name].[ext]?[hash:8]'
            }
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: 'images/fonts/[name].[ext]?[hash:8]'
            }
        }
    ];
};
