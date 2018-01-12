import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import oneself from './oneself';
import assist from './assist';
import resource from './resource';
import user from './user';

export default combineReducers({
    routing: routerReducer,
    oneself,
    assist,
    resource,
    user,
});
