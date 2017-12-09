import qs from 'qs';
import request from '../../utils/requester';

export const SAVE_TOKEN = 'oneself/SAVE_TOKEN';
export const CLEAR_TOKEN = 'oneself/CLEAR_TOKEN';

const initialState = {
    accessToken: null,
    refreshToken: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case CLEAR_TOKEN:
            return {
                ...state,
                accessToken: null,
                refreshToken: null,
            };

        default:
            return state;
    }
};

export const login = (username, password, cb) => {
    return async (dispatch) => {
        const { access_token, refresh_token } = await request.post('/login/password', qs.stringify({
            username,
            password,
        }));

        dispatch({
            type: SAVE_TOKEN,
            payload: {
                accessToken: access_token,
                refreshToken: refresh_token,
            },
        });

        return cb();
    };
};

export const logout = (cb) => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_TOKEN,
        });
        return cb();
    };
};
