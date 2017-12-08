import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import user from './user';
import assist from './assist';

export default combineReducers({
    routing: routerReducer,
    counter,
    user,
    assist,
});
