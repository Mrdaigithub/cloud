import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import oneself from './oneself';
import assist from './assist';

export default combineReducers({
    routing: routerReducer,
    counter,
    oneself,
    assist,
});
