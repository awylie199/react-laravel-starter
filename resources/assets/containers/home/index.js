import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Actions as globalActions} from '../../actions/global';
import Head from '../global/head';
import MapContainer from './elements/map';

export class Home extends Component {
    static propTypes = {
        getGeolocation: PropTypes.func.isRequired
    }
    componentWillMount() {
        let {getGeolocation} = this.props;

        if (typeof window !== 'undefined') {
            getGeolocation();
        }
    }
    render() {
        return (
            <div style={{height: '100%'}}>
                <Head title="Home" />
                <MapContainer />
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
