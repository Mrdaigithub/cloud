import axios from 'axios';
import store from '../store';
import { toggleLoading, alert } from '../store/modules/assist';

const errors = {
    400000: '请求参数缺失',
    400001: '请求参数存在非法字符',
    400002: '请求参数格式错误',
    400003: '用户不存在',
    400004: '用户已存在',
    401000: '密码错误',
    401001: '用户未携带有效的access token',
    401002: '未授权',
    403000: '权限不足',
    409000: '上传的文件已存在于服务器',
    500000: '网络错误',
    500001: '保存失败',
};

const requester = axios.create({
    baseURL: '//api.mrdaisite.com/api/v1/',
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

requester.interceptors.request.use(
    (config) => {
        const configs = config;
        toggleLoading()(store.dispatch);
        if (sessionStorage.accessToken) {
            configs.headers.common.Authorization = `Bearer ${sessionStorage.accessToken}`;
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
        if (!error.response) {
            toggleLoading()(store.dispatch);
            alert('本地请求失败', 1500)(store.dispatch);
            return Promise.reject(error);
        }
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
