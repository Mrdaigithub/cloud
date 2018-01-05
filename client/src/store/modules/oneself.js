import qs from 'qs';
import request from '../../utils/requester';

export const SAVE_TOKEN = 'oneself/SAVE_TOKEN';
export const CLEAR_TOKEN = 'oneself/CLEAR_TOKEN';
export const FETCH_ONESELF = 'oneself/FETCH_ONESELF';

const initialState = {
    accessToken: null,
    refreshToken: null,
    id: null,
    username: '',
    email: '',
    isAdmin: false,
    capacity: 0,
    used: 0,
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
        case FETCH_ONESELF:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                isAdmin: action.payload.isAdmin,
                capacity: action.payload.capacity,
                used: action.payload.used,
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
        sessionStorage.accessToken = access_token;
        sessionStorage.refreshToken = refresh_token;
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

export const getInfo = () => {
    return async (dispatch) => {
        const { id, username, email, is_admin, capacity, used } = await request.get('/users/0');
        return dispatch({
            type: FETCH_ONESELF,
            payload: {
                id,
                username,
                email,
                isAdmin: is_admin,
                capacity,
                used,
            },
        });
    };
};
