const path = require('path');
const NODE_MODULES_PATH = path.join(__dirname, 'node_modules')
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
            publicPath: '/',
            clean: true,
        },
        devServer: {
            static: path.resolve(__dirname, 'dist'),
            historyApiFallback: true,
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
                        "css-loader",
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
                '@app': path.join(__dirname, '/src/scripts/react-app'),
                '@styles': path.join(__dirname, '/src/scss'),
            },
        },
        optimization: {
            minimize: isProd,
            usedExports: true,
            runtimeChunk: 'single',
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        },
    }
}