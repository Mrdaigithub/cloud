import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import counter from './counter'
import loading from './loading'

export default combineReducers({
    routing: routerReducer,
    counter,
    loading
})