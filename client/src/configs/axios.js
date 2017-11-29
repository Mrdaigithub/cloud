import axios from 'axios'

let axiosInstance = axios.create({
    baseURL: 'http://api.mrdaisite.com/api/v1',
    timeout: 3000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

axiosInstance.interceptors.request.use(
    config => {
        if (sessionStorage.token) {
            config.headers.common['Authorization'] = `Bearer ${sessionStorage.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
);

axiosInstance.interceptors.response.use(
    response => {
        if (response.headers.authorization) sessionStorage.token = response.headers.authorization.replace(/Bearer\s/, '')
        return response.data
    },
    error => {
        if (error.response.data.error) {
            let errorCode = error.response.data['error']
            if (errorCode === 'token_not_provided' || errorCode === 'token_expired' || errorCode === 'token_invalid') {
                setTimeout(() => {
                }, 2000)
            }
        } else {
        }
        return Promise.reject(error.response.data)
    });

export default axiosInstance
