/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
