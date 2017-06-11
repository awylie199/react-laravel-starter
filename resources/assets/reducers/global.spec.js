import {expect} from 'chai';
import * as GlobalActions from './global';
import * as GlobalConstants from '../constants/global';

describe('GlobalReducer', function() {
    it('exports a reducer for setting geolocation', () => {
        let state = GlobalActions.default(undefined, {
            type: GlobalConstants.SET_GEOLOCATION,
            lat: 45.444,
            lng: -20.123
        });
        expect(state.getIn(['coords', 'lat'])).to.equal(45.444);
        expect(state.getIn(['coords', 'lng'])).to.equal(-20.123);
    });
});
