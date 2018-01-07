import qs from 'qs';
import request from '../../utils/requester';

export const FETCH_ONESELF = 'oneself/FETCH_ONESELF';
export const CLEAR_ONESELF = 'oneself/CLEAR_ONESELF';

const initialState = {
    id: null,
    username: '',
    email: '',
    isAdmin: false,
    capacity: 0,
    used: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
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
        case CLEAR_ONESELF:
            return {
                ...state,
                id: null,
                username: '',
                email: '',
                isAdmin: false,
                capacity: 0,
                used: 0,
            };

        default:
            return state;
    }
};

export const login = (username, password, cb) => {
    return async () => {
        const { access_token, refresh_token } = await request.post('/login/password', qs.stringify({
            username,
            password,
        }));
        sessionStorage.accessToken = access_token;
        sessionStorage.refreshToken = refresh_token;
        return cb();
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ONESELF,
        });
    };
};

export const fetchOneself = () => {
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

export const clearToken = () => {
    return () => {
        delete sessionStorage.accessToken;
        delete sessionStorage.refreshToken;
    };
};
