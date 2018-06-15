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
import request from '../../utils/requester';

export const FETCH_ONESELF = 'oneself/FETCH_ONESELF';
export const CLEAR_ONESELF = 'oneself/CLEAR_ONESELF';

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
    delete sessionStorage.accessToken;
    delete sessionStorage.refreshToken;
    return () => {
        delete sessionStorage.accessToken;
        delete sessionStorage.refreshToken;
    };
};
