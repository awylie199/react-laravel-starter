import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import global from './reducers/global';

export default combineReducers({
    global,
    form,
    router: routerReducer
});
