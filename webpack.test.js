const webpack = require('webpack'),
    path = require('path');

let nodeExternals = require('webpack-node-externals');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.traceDeprecation = true;

module.exports = {
    externals: [nodeExternals()],
    entry: [
    ],
    output: {
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.ContextReplacementPlugin(/sinon/, /^$/)
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'resources/assets'),
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.scss', '.json', '.css'],
        alias: {
            styles: path.join(__dirname, 'resources/assets/index.scss')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'resources/assets'),
                exclude: /node_modules/,
                loader: 'babel-loader'

            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    'resolve-url-loader',
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            hash: 'sha512',
                            digest: 'hex',
                            name: '[hash].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                include: [
                    path.join(__dirname, 'resources/assets')
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                ]
            }
        ]
    }
};
