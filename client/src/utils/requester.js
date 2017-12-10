import axios from 'axios';
import store from '../store';
import { toggleLoading, alert } from '../store/modules/assist';

const errors = {
    400000: '用户名请求参数缺失',
    400001: '密码请求参数缺失',
    400002: '用戶名请求参数存在非法字符',
    400003: '密码请求参数存在非法字符',
    400004: '用户不存在',
    400005: '用户已存在',
    400006: '新密码请求参数缺失',
    400007: '新密码请求参数存在非法字符',
    400008: '用户名请求参数过短',
    400009: '用户名请求参数过长',
    400010: '密码请求参数过短',
    400011: '密码请求参数过长',
    400012: '账户有效期请求参数缺失',
    400013: '账户有效期请求参数存在非法字符',
    400014: '请求参数存在非法字符',
    401000: '密码错误',
    401001: '用户有效期限已过',
    401002: '未授权',
    403000: '权限不足',
    500000: '网络错误',
    500001: '保存失败',
};

const requester = axios.create({
    baseURL: '//api.mrdaisite.com/api/v1/',
    timeout: 3000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

requester.interceptors.request.use(
    (config) => {
        const configs = config;
        toggleLoading()(store.dispatch);
        if (store.getState().user.accessToken) {
            const { accessToken } = store.getState().user.accessToken;
            configs.headers.common.Authorization = `Bearer ${accessToken}`;
        }
        return configs;
    },
    (err) => {
        toggleLoading()(store.dispatch);
        alert('本地请求失败', 1500)(store.dispatch);
        return Promise.reject(err);
    });

requester.interceptors.response.use(
    (response) => {
        toggleLoading()(store.dispatch);
        return response.data;
    },
    (error) => {
        toggleLoading()(store.dispatch);
        const data = error.response.data;
        if (data.status === 'error') {
            const errorCode = data.message;
            alert(errors[errorCode], 1500)(store.dispatch);
        } else {
            alert('远端服务器超时', 1500)(store.dispatch);
        }
        return Promise.reject(data);
    });

export default requester;
