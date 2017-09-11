const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require('autoprefixer')({
    browsers: [
        "Explorer >= 11",
        "last 2 versions"
    ]
});

const cssnano = require("cssnano")({
    discardComments: {
        removeAll: true
    },
    sourcemap: true
});

module.exports = {
    // The standard entry point and output config
    entry: {
        tachyonic: "./tachyonic"
    },
    output: {
        filename: "css/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                map: true,
                                plugins: [autoprefixer, cssnano]
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sourceComments: true,
                                outputStyle: "expanded",
                                precision: 8
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css")
    ]
}
