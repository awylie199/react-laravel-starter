import * as Constants from '../constants/global';

export const Actions = {
    getGeolocation: () => ({type: Constants.GET_GEOLOCATION}),
    setGeolocation: (lat, lng) => ({type: Constants.SET_GEOLOCATION, lat, lng})
};
