import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

const token = localStorage.getItem('token')
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axiosInstance.interceptors.response.use(undefined, function (err) {
    return new Promise(function () {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            store.dispatch('auth/logout')
        }
        throw err;
    });
});
//status: "Token is Expired"
export default axiosInstance;
