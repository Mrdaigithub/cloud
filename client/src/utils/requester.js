import axios from 'axios';
import store from '../store';
import { toggleLoading, alert } from '../store/modules/assist';

const requester = axios.create({
    baseURL: '//api.mrdaisite.com/api/v1/',
    timeout: 3000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

requester.interceptors.response.use(
    (response) => {
        // if (response.headers.authorization) sessionStorage.token = response.headers.authorization.replace(/Bearer\s/, '')
        // vm.$store.commit('closeLoading')
        return response.data;
    },
    (error) => {
        alert('sb', 2000)(store.dispatch);
        // store.dispatch.toggleLoading();
        if (error.response.data.error) {
            // vm.$store.commit('closeLoading')
            // let errorCode = error.response.data['error']
            // vm.$toast(errors[errorCode], {
            //     horizontalPosition: 'center',
            //     className: ['et-alert'],
            //     duration: 2000
            // })
            // if (errorCode === 'token_not_provided' || errorCode === 'token_expired' || errorCode === 'token_invalid') {
            //     setTimeout(() => {
            //         vm.$router.replace('/login')
            //     }, 2000)
            // }
        } else {
            // vm.$store.commit('closeLoading')
            // vm.$toast('服务器请求超时', {
            //     horizontalPosition: 'center',
            //     className: ['et-alert'],
            //     duration: 2000
            // })
        }
        return Promise.reject(error.response.data);
    });

export default requester;
