import qs from 'qs';
import requester from '../../utils/requester';

export const GET_USERS = 'user/GET_USERS';
export const ADD_USER = 'user/ADD_USER';
export const REMOVE_USER = 'user/REMOVE_USER';

const initialState = {
    users: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload.users,
            };
        case ADD_USER: {
            const users = state.users.slice(0);
            users.push(action.payload.user);
            return {
                ...state,
                users,
            };
        }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(({ id }) => action.payload.id !== id),
            };

        default:
            return state;
    }
};

export const fetchUsers = (cb) => {
    return async (dispatch) => {
        const users = await requester.get('users');
        dispatch({
            type: GET_USERS,
            payload: {
                users,
            },
        });
        return cb(users);
    };
};

export const addUser = (userData, cb) => {
    return async (dispatch) => {
        const user = await requester.post('/users', qs.stringify(userData));
        dispatch({
            type: ADD_USER,
            payload: {
                user,
            },
        });
        return cb(user);
    };
};

export const removeUsers = (idList, cb) => {
    return async (dispatch) => {
        const deleteList = idList.map(id => requester.delete(`users/${id}`));
        await Promise.all(deleteList);
        idList.forEach(id => (
            dispatch({
                type: REMOVE_USER,
                payload: {
                    id,
                },
            })
        ));
        return cb(idList);
    };
};
