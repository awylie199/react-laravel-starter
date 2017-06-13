import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Home} from './index';

const geolocate = require('mock-geolocation');

describe('Home', () => {
    let props = {};

    beforeEach(function() {
        props = {
            getGeolocation: () => {}
        };
        geolocate.use();
    });

    afterEach(function() {
        geolocate.restore();
    });

    it('calls componentWillMount', function() {
        let mountSpy = sinon.spy(Home.prototype, 'componentWillMount');
        shallow(<Home {...props} />);
        expect(mountSpy.calledOnce).to.equal(true);
    });

    it('calls setGeolocation', function() {
        let geoSpy = sinon.spy(props, 'getGeolocation');
        shallow(<Home {...props} />);
        expect(geoSpy.calledOnce).to.equal(true);
    });
});
