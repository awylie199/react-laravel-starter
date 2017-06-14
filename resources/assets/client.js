import 'react-hot-loader/patch';
import path from 'path';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import Serialize from 'remotedev-serialize';
import Immutable from 'immutable';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import {AppContainer} from 'react-hot-loader';
import setupStore from './store';
import Container from './containers';
import 'styles';

const {parse} =  Serialize.immutable(Immutable);

// Register Service Worker for Progressive Web App - Access Webpack Assets
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    runtime.register();
}

/**
 * Configure the Redux Store with Hot Reloading
 *
 * @param {Object} state      Preloaded Redux State from Server
 * @returns {Object}          Initialised Redux Store
 */
function configureStore(state) {
    const store = setupStore(state);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(path.join(__dirname, 'reducers'), () => {
            const nextRootReducer = require('./root-reducer');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = parse(window.__PRELOADED_STATE__);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState),
    history = createHistory();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppContainer>
                <Container />
            </AppContainer>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers', () => {
        const NextContainer = require('./containers');

        render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <AppContainer>
                        <NextContainer />
                    </AppContainer>
                </ConnectedRouter>
            </Provider>,
            document.getElementById('root')
        );
    });
}
