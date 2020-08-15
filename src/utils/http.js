import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API,
});

const token = localStorage.getItem('token')
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

/*axiosInstance.interceptors.response.use(undefined, function (err) {
    return new Promise(function () {
        console.log(err);
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            store.dispatch('auth/logout')
        }
        throw err;
    });
});*/

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const token = localStorage.getItem('token');
        return new Promise(function (resolve, reject) {
            axiosInstance.post('/auth/refresh', { token })
                .then(({data}) => {
                    localStorage.setItem('token', data.token);
                    //localStorage.setItem('refreshToken', data.refreshToken);
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
                    resolve(axios(originalRequest));
                })
                .catch((err) => {
                    store.dispatch('auth/logout');
                    reject(err);
                });
        })
    }

    return Promise.reject(error);
});
//status: "Token is Expired"
export default axiosInstance;
