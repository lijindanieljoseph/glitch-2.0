const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) => {
    return {
        entry: {
            bundle: './public/javascripts/glitch.js',
            client: './public/javascripts/modules/client.js',
            worker: './public/javascripts/modules/serviceworker.js',
        },
        devtool: options.mode === 'production' ? false : 'inline-source-map',
        performance: {
            hints: false,
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(png|ico|jpe?g|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'img/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(mp3|wav|ogg|m4a)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'audio/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        options.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    // eslint-disable-next-line global-require
                                    return [require('precss'), require('autoprefixer')];
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css',
            }),
            new CleanWebpackPlugin(['client']),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
                Util: 'exports-loader?Util!bootstrap/js/dist/util',
                Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            }),
        ],
        optimization: {
            minimizer: [
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    // eslint-disable-next-line global-require
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        map: false,
                    },
                    cssProcessorPluginOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: {
                                    removeAll: true,
                                },
                            },
                        ],
                    },
                    canPrint: true,
                }),
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                }),
                new CompressionPlugin({
                    test: /\.js$|\.css$/,
                    threshold: 10240,
                    minRatio: 0.7,
                }),
                new BrotliPlugin({
                    test: /\.js$|\.css$/,
                    threshold: 10240,
                    minRatio: 0.7,
                }),
            ],
        },
        output: {
            path: path.resolve(__dirname, 'client', 'dist'),
            filename: '[name].js',
            // publicPath: '/'
        },
    };
};
