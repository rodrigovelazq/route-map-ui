import router from '../../router';
import http from '../../utils/http'

const state = () => ({
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
})

const getters = {
    isLoggedIn: state => !!state.token
}

const actions = {
    registerUser({commit, dispatch}, newUser) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            http.post('/register', newUser).then(
                resp => {
                    //const token = resp.data.token
                    //const user = resp.data.user
                    //localStorage.setItem('token', token)
                    // Add the following line:
                    //http.defaults.headers.common['Authorization'] = token
                    //commit('auth_success', token, user)
                    router.push('/login');
                    dispatch('alerta/showSucess', 'Se registro satisfactoriamente', {root: true});
                    resolve(resp)
                }
            ).catch(err => {
                commit('auth_error', err)
                dispatch('alerta/showError', 'Ocurrio un error al momento de registrarse', {root: true});
                //localStorage.removeItem('token')
                reject(err)
            });
        })
    },
    login({commit, dispatch}, credentials){
        return new Promise((resolve, reject) => {
            commit('auth_request')
            http.post('/login', credentials)
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    localStorage.setItem('token', token)
                    // Add the following line:
                    http.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token, user)
                    dispatch('alerta/showSucess', 'Se autentico satisfactoriamente', {root: true});
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error')
                    dispatch('alerta/showError', 'Ocurrio un error al momento de autenticarse', {root: true});
                    //localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout({commit}){
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            delete http.defaults.headers.common['Authorization']
            router.push('/login');
            resolve()
        })
    }
}

const mutations = {
    auth_request(state) {
        state.status = 'AUTH_REQUEST'
    },
    auth_success(state, token, user) {
        state.status = 'AUTH_SUCCESS'
        state.token = token
        state.user = user
    },
    auth_error(state) {
        state.status = 'AUTH_ERROR'
    },
    logout(state) {
        state.status = ''
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
