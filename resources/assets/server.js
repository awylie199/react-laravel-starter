/* eslint no-console: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {Helmet as reactHelmet} from 'react-helmet';
import Serialize from 'remotedev-serialize';
import Immutable from 'immutable';
import setupStore from 'client/store';
import Container from 'client/containers';

const {stringify} =  Serialize.immutable(Immutable);

export default class App extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired
    }
    render() {
        let {url} = this.props,
            context = {},
            //@TODO How to do a redirect based on router context?
            store = setupStore(),
            html = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <Container />
                    </StaticRouter>
                </Provider>
            ),
            // Call renderStatic to prevent memory leek
            // @see https://github.com/nfl/react-helmet
            renderedHelmet = reactHelmet.renderStatic(),
            preloadedState = store.getState();

        return (
            <html {...renderedHelmet.htmlAttributes}>
                <head>
                    {...renderedHelmet.title}
                    {...renderedHelmet.meta}
                    {...renderedHelmet.link}
                    {...renderedHelmet.script}
                </head>
                <body {...renderedHelmet.bodyAttributes}>
                    <div
                        class="root"
                        id="root"
                        dangerouslySetInnerHTML={{__html: html}}
                    >
                    </div>
                    <script>
                        {`window.__PRELOADED_STATE__ = '${stringify(preloadedState)}'`}
                    </script>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        );
    }
}
