/* eslint no-console: 0 */

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import cors from 'cors';
import config from '../webpack.config.js';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    port: process.env.DEV_PORT || 3001,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,
    compress: true,
    https: true,
    overlay: true,
    setup(app) {
        app.use(cors());
    },
    disableHostCheck: true,
}).listen(3001, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log(`HMR Dev Server Listening at port: ${process.env.DEV_PORT || 3001}`);
});
