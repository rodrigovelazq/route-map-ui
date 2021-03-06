import router from '../../router';
import http from '../../utils/http'

const state = () => ({
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    error: ''
})

const getters = {
    isLoggedIn: state => !!state.token
}

const actions = {
    registerUser({commit, dispatch}, newUser) {
        return new Promise((resolve, reject) => {
            commit('registerRequested')
            http.post('/auth/register', newUser).then(
                resp => {
                    commit('registerSucceeded');
                    dispatch('snackbar/showSuccess', 'Se registro satisfactoriamente', {root: true});
                    router.push('/login');
                    resolve(resp)
                }
            ).catch(err => {
                commit('registerFailed', err)
                dispatch('snackbar/showError', 'Ocurrio un error al momento de registrarse', {root: true});
                //localStorage.removeItem('token')
                reject(err)
            });
        })
    },
    login({commit, dispatch}, credentials) {
        commit('authRequested')
        http.post('/auth/login', credentials)
            .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                // Add the following line:
                http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                commit('authSucceeded', {token, user})
                dispatch('snackbar/showSuccess', 'Se autentico satisfactoriamente', {root: true});
                router.push('/');
            })
            .catch(err => {
                commit('authFailed', err)
                dispatch('snackbar/showError', 'Ocurrio un error al momento de autenticarse', {root: true});
            })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            commit('authLogout')
            localStorage.removeItem('token')
            delete http.defaults.headers.common['Authorization']
            router.push('/login').catch(()=>{});
            resolve()
        })
    }
}

const mutations = {
    registerRequested(state) {
        state.status = 'REGISTER_REQUEST'
    },
    registerSucceeded(state) {
        state.status = 'REGISTER_REQUEST'
    },
    registerFailed(state, error) {
        state.status = 'REGISTER_REQUEST'
        state.error = error
    },

    authRequested(state) {
        state.status = 'AUTH_REQUEST'
    },
    authSucceeded(state, {token, user}) {
        state.status = 'AUTH_SUCCESS'
        state.token = token
        state.user = user
    },
    authFailed(state, error) {
        state.status = 'AUTH_ERROR';
        state.error = error;
    },
    authLogout(state) {
        state.status = 'AUTH_LOGOUT'
        state.token = ''
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
