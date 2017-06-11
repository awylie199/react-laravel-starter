import * as Constants from '../constants/global';
import {Map} from 'immutable';

const initialState = Map({
    coords: Map({
        lat: 59.95,
        lng: 30.33
    }),
    zoom: 11
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case Constants.SET_GEOLOCATION:
        return state.setIn(['coords', 'lat'], action.lat)
            .setIn(['coords', 'lng'], action.lng);
    default:
        return state;
    }
}
