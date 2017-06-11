/* eslint no-console: 0 */

import {Actions as globalActions} from '../actions/global';
import * as globalConstants from '../constants/global';

export default () => next => action => {
    next(action);

    switch (action.type) {
    case globalConstants.GET_GEOLOCATION:
        new Promise(function(resolve, reject) {
            if ('navigator' in window) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    if ('coords' in position) {
                        resolve(position.coords);
                    } else {
                        reject('No coords within geolocation');
                    }
                });
            } else {
                reject('No navigator in window');
            }
        })
        .then(function({latitude, longitude}) {
            next(globalActions.setGeolocation(latitude, longitude));
        })
        .catch(err => console.log(err));
        break;
    default:
        break;
    }
};
