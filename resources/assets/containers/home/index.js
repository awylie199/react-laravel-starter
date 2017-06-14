import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions as globalActions} from '../../actions/global';

export class Home extends Component {
    static propTypes = {
        getGeolocation: PropTypes.func.isRequired
    }
    componentDidMount() {
        let {getGeolocation} = this.props;

        getGeolocation();
    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <h1>Home</h1>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getGeolocation: () => dispatch(globalActions.getGeolocation())
    };
}

export default connect(null, mapDispatchToProps)(Home);
