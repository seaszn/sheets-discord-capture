const path = require('path');
const webpack = require('webpack')
const GasPlugin = require('gas-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    entry: './src/global.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                    output: {
                        comments: /@customFunction/i
                    }
                }
            }),
        ]
    },
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer"),
        },
        extensions: ['.ts', '.js']
    },
    plugins: [
        new GasPlugin(),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ]
};

module.exports = config