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

import axios from 'axios';
import store from '../store';
import ERROR_CODES from '../constants/errorCodes';
import { BASE_URL, NETWORK_TIMEOUT, HEADERS } from '../constants/requesterConfig';
import { toggleLoading, alert } from '../store/actions/assistActions';
import { debounce } from './assist';


const requester = axios.create({
    baseURL: BASE_URL,
    timeout: NETWORK_TIMEOUT,
    headers: HEADERS,
});
requester.animate = true;

const debounceAlert = (msgText, time) => {
    debounce(() => alert(msgText, time)(store.dispatch))();
};

requester.setAnimate = (bool = true) => {
    requester.animate = bool;
};

requester.interceptors.request.use(
    (config) => {
        const configs = config;
        // noinspection JSAnnotator
        if (requester.animate) {
            toggleLoading(true)(store.dispatch);
        }
        if (sessionStorage.accessToken) {
            configs.headers.common.Authorization = `Bearer ${sessionStorage.accessToken}`;
        }
        return configs;
    },
    (err) => {
        toggleLoading(false)(store.dispatch);
        // debounceAlert('本地请求超时');
        return Promise.reject(err);
    });

requester.interceptors.response.use(
    (response) => {
        toggleLoading(false)(store.dispatch);
        return response.data;
    },
    (error) => {
        toggleLoading()(store.dispatch);
        if (!error.response) {
            toggleLoading(false)(store.dispatch);
            // debounceAlert('本地请求超时');
            return Promise.reject(error);
        }
        const data = error.response.data;
        if (data.errors) {
            const errorCode = data.errors[Object.keys(data.errors)[0]][0];
            // alert(ERROR_CODES[errorCode])(store.dispatch);
            // debounceAlert(ERROR_CODES[errorCode]);
            for (let i = 0; i < 50; i++) {
                debounceAlert(ERROR_CODES[errorCode]);
            }
        } else {
            // debounceAlert('远端服务器超时');
        }
        return Promise.reject(data);
    });

export default requester;
