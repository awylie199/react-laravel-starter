/* eslint no-console: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import Serialize from 'remotedev-serialize';
import Immutable from 'immutable';
import setupStore from './store';
import Container from './containers';

const {stringify} =  Serialize.immutable(Immutable);

class App extends Component {
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
                    <StaticRouter location={url} context={context}>
                        <Container />
                    </StaticRouter>
                </Provider>
            ),
            preloadedState = store.getState();

        return (
            <div>
                <div
                    className="root"
                    id="root"
                    dangerouslySetInnerHTML={{__html: html}}
                />
                <script dangerouslySetInnerHTML={{
                    __html: `window.__PRELOADED_STATE__ = '${stringify(preloadedState)}'`
                }} />
                <script src="/bundle.client.js"></script>
            </div>
        );
    }
}

module.exports = App;
