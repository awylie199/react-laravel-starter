/* eslint no-console: 0 */

import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {Helmet as reactHelmet} from 'react-helmet';
import Serialize from 'remotedev-serialize';
import Immutable from 'immutable';
import setupStore from 'client/store';
import Container from 'client/containers';

const {stringify} =  Serialize.immutable(Immutable);

/**
 * Render the Page With Preloaded Redux State and Components
 *
 * @param {string} html             Rendered Components
 * @param {Object} preloadedState   Redux Preloaded State
 * @param {Object} reactHelmet      React Helmet Properties
 * @returns {string}                Rendered HTML Page
 */
function renderFullPage(html, preloadedState, reactHelmet) {
    return `
    <!doctype html>
    <html ${reactHelmet.htmlAttributes.toString()}>
        <head>
            ${reactHelmet.title.toString()}
            ${reactHelmet.meta.toString()}
            ${reactHelmet.link.toString()}
            ${reactHelmet.script.toString()}
        </head>
        <body ${reactHelmet.bodyAttributes.toString()}>
            <div class="root" id="root">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = '${stringify(preloadedState)}'
            </script>
            <script src="/bundle.js"></script>
        </body>
    </html>
    `;
}

/**
 * Initialize Express App with Middleware and Routes
 *
 * @param {Object} app    Express Server Instance
 * @return {void}
 */
function setupExpress(app) {
    app.get('*', function(req, res) {
        let context = {},
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

        if (context.url) {
            res.writeHead(302, {
                Location: context.url
            });
            res.end();
        } else {
            res.send(renderFullPage(html, preloadedState, renderedHelmet));
        }
    });
}

