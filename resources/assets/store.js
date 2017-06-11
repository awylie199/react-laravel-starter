import {createStore, applyMiddleware} from 'redux';
import reducer from './root-reducer';
import promise from 'redux-promise';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import globalMiddleware from './middleware/global';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function setupStore(initialState = {}) {
    let middleware = [
        globalMiddleware,
        promise
    ];

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const history = createHistory();

        middleware.push(routerMiddleware(history));
    }

    if (process.env.NODE_ENV !== 'prod') {
        const createLogger = require('redux-logger');

        middleware.push(createLogger());
    }

    if (typeof window !== 'undefined') {
        return createStore(reducer, initialState, composeWithDevTools(
            applyMiddleware(...middleware)
        ));
    } else {
        return createStore(reducer, initialState, applyMiddleware(...middleware));
    }
}
