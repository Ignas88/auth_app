const path = require('path');
const ROOT_PATH = path.resolve()
const NODE_MODULES_PATH = path.join(ROOT_PATH, 'node_modules')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
    const isProd = !!env.prod;
    return {
        mode: isProd ? 'production' : 'development',
        entry: './src/scripts',
        output: {
            hashDigestLength: 8,
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? '[name].[contenthash].js' : '[name].js',
            chunkFilename: isProd ? '[name].[contenthash].js' : '[name].js',
            assetModuleFilename: 'images/[name].[contenthash].[ext][query]',
            publicPath: './',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: isProd ? '[name].[contenthash].css' : '[name].css',
                chunkFilename: isProd ? '[name].[contenthash].css' : '[name].css',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    use: {
                        loader: 'swc-loader',
                        options: {
                            cacheDirectory: true,
                        }
                    },
                    exclude: path.resolve(NODE_MODULES_PATH),
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.scg'],
            alias: {
                '@app': path.resolve('./src/scripts/react-app')
            },
            fallback: {
                'react/jsx-runtime': 'react/jsx-runtime.js',
                'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
            }
        },
        optimization: {
            minimize: isProd,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        },
    }
}