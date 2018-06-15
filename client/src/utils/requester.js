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
import { toggleLoading, alert } from '../store/actions/assistActions';

// 全局错误状态码
const errorCodes = {
    '400000': '参数缺失',
    '400001': '参数字符过短',
    '400002': '参数字符过长',
    '400003': '请求参数存在非法字符',
    '400004': '请求参数格式错误',
    '400005': '请求参数不存在于数据库',
    '400006': '请求参数已存在于数据库',
    '401000': '密码错误',
    '401001': '无效的的access_token',
    '401002': '无效的的refresh_token',
    '403000': '权限不足',
    '409000': '上传的资源已存在于服务器',
    '409001': '请求的资源不存在',
    '409002': '此用户的存储容量不足',
    '500000': '服务器错误',
    '500001': '服务器资源保存失败',
    '504000': '资源下载链接失效',
};

const requester = axios.create({
    baseURL: '//api.mrdaisite.com/api/v1/',
    timeout: 60000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

requester.interceptors.request.use(
    (config) => {
        const configs = config;
        toggleLoading(true)(store.dispatch);
        if (sessionStorage.accessToken) {
            configs.headers.common.Authorization = `Bearer ${sessionStorage.accessToken}`;
        }
        return configs;
    },
    (err) => {
        toggleLoading(false)(store.dispatch);
        alert('本地请求超时', 1500)(store.dispatch);
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
            alert('本地请求超时', 1500)(store.dispatch);
            return Promise.reject(error);
        }
        const data = error.response.data;
        if (data.errors) {
            const errorCode = data.errors[Object.keys(data.errors)[0]][0];
            alert(errorCodes[errorCode], 1500)(store.dispatch);
        } else {
            alert('远端服务器超时', 1500)(store.dispatch);
        }
        return Promise.reject(data);
    });

export default requester;
