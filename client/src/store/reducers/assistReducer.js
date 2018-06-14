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

export const TOGGLE_LOADING = 'assist/TOGGLE_LOADING';
export const TOGGLE_MSG = 'assist/TOGGLE_MSG';
export const CHANGE_MSG = 'assist/CHANGE_MSG';

const initialState = {
    loading: false,
    msgShow: false,
    msgText: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
            };
        case TOGGLE_MSG:
            return {
                ...state,
                msgShow: !state.msgShow,
            };
        case CHANGE_MSG:
            return {
                ...state,
                msgText: action.payload.msgText,
            };

        default:
            return state;
    }
};

export const toggleLoading = (loading) => {
    return (dispatch) => {
        return dispatch({
            type: TOGGLE_LOADING,
            payload: {
                loading,
            },
        });
    };
};

export const alert = (msgText = '', time = 3000) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MSG,
        });
        dispatch({
            type: CHANGE_MSG,
            payload: {
                msgText,
            },
        });

        return setTimeout(() => {
            dispatch({
                type: TOGGLE_MSG,
            });
            dispatch({
                type: CHANGE_MSG,
                payload: {
                    msgText: '',
                },
            });
        }, time);
    };
};
