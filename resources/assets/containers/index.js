import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import Home from './home';
import About from './about';
import NotFound from './not-found';

export default class Container extends Component {
    render() {
        return (
            <Switch style={{height: '100%'}}>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
