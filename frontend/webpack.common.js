const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');
module.exports = {
    entry: {
        index: './src/index.js',
    },
    resolve: {
        modules: ['./node_modules'],
        fallback: {
            fs: false,
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets',
                },
            ],
        }),
    ],
    output: {
        filename: '[name][contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    // watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: { outputStyle: 'expanded' },
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)$/i,
                include: [path.resolve(__dirname, './src/assets/images')],
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                'svgo',
                                {
                                    plugins: {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                // customize plugin options
                                                convertShapeToPath: {
                                                    convertArcs: true,
                                                },
                                                // disable plugins
                                                convertPathData: false,
                                            },
                                        },
                                    },
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
};
