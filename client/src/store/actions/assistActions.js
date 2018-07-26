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

import { DELAY_TIME } from '../../constants';

export const TOGGLE_LOADING = 'assist/TOGGLE_LOADING';
export const TOGGLE_MSG = 'assist/TOGGLE_MSG';
export const CHANGE_MSG = 'assist/CHANGE_MSG';
export const SET_TITLE = 'assist/SET_TITLE';
export const SET_APP_BAR_MENU = 'assist/SET_APP_BAR_MENU';

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

export const alert = (msgText = '', time = DELAY_TIME) => {
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

export const setPageTitle = (pageTitle) => {
    return (dispatch) => {
        return dispatch({
            type: SET_TITLE,
            payload: {
                pageTitle,
            },
        });
    };
};

export const setAppBarMenu = (appBarMenu) => {
    return (dispatch) => {
        return dispatch({
            type: SET_APP_BAR_MENU,
            payload: {
                appBarMenu,
            },
        });
    };
};
