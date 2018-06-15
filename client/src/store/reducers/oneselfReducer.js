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

import {
    FETCH_ONESELF,
    CLEAR_ONESELF,
} from '../actions/oneselfActions';

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
