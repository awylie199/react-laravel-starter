const path = require('path'),
    webpack = require('webpack'),
    StyleLintPlugin = require('stylelint-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const env = process.env.NODE_ENV || 'development',
    host = process.env.HOST || '192.168.33.16',
    devPort = process.env.DEV_PORT || 3001;
const plugins = [
    new StyleLintPlugin({
        configFile: './.stylelintrc'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(env)
        },
    }),
    new webpack.LoaderOptionsPlugin({
        debug: env === 'development'
    }),
    new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'resources/assets/service-worker.js')
    })
];

let rules = [
    {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
            /node_modules/
        ],
        loader: 'eslint-loader',
        include: path.join(__dirname, 'resources/assets')
    },
    {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: [
            /node_modules/
        ],
        include: path.join(__dirname, 'resources/assets')
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
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
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]'
    }
];

if (env === 'prod') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    }));
    plugins.push(new ExtractTextPlugin(
        path.join(__dirname, 'public/app.css')
    ));
    rules.push({
        test: /\.s?css$/,
        include: [
            path.join(__dirname, 'resources/assets')
        ],
        use: [{
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'poscss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            })
        }]
    });
} else {
    rules.push({
        test: /\.scss$/,
        include: path.join(__dirname, 'resources/assets'),
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
            'resolve-url-loader',
        ]
    });
    rules.push({
        test: /\.css$/,
        include: [
            path.join(__dirname, 'resources/assets')
        ],
        use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
        ]
    });
    plugins.push(
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    plugins,
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: `https://${host}:${devPort}/`
    },
    module: {
        rules
    },
    resolve: {
        modules: [
            path.join(__dirname, 'resources/assets'),
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.scss', '.json', '.css'],
        alias: {
            react_ujs: path.join(__dirname, 'public/vendor/react-laravel/react_ujs.js'),
            styles: path.join(__dirname, 'resources/assets/index.scss')
        }
    },
    entry: [
        `webpack-dev-server/client?https://${host}:${devPort}/`,
        'webpack/hot/only-dev-server',
        path.join(__dirname, 'resources/assets/index.js')
    ]
};
