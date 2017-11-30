import {combineReducers} from 'redux'
import {SAVE_ACCESS_TOKEN} from './actions'

function token(state = [], action) {
    switch (action.type) {
        case SAVE_ACCESS_TOKEN:
            return [
                ...state,
                {
                    text: action.text
                }
            ]
    }
}

const cloudApp = combineReducers({
    token
});

export default cloudApp
