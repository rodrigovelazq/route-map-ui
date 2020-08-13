const state = () => ({
    status: '',
    error: false,
    success: false,
    message: '',
})

const getters = {
    success: state => state.success,
    error: state => state.error,
    message: state => state.message
}

const actions = {
    showSucess({commit}, message) {
        commit('showSucessAlert', message)
    },
    dismissSucess({commit}) {
        commit('dismissSucessAlert')
    },
    showError({commit}, message) {
        commit('showErrorAlert', message)
    },
    dismissError({commit}) {
        commit('dismissErrorAlert')
    }
}

const mutations = {
    showSucessAlert(state, message) {
        state.status = 'SHOW_SUCESS_ALERT';
        state.success = true;
        state.message = message
    },
    dismissSucessAlert(state) {
        state.status = 'DISMISS_SUCESS_ALERT';
        state.success = false;
        state.message = ''
    },
    showErrorAlert(state, message) {
        state.status = 'SHOW_ERROR_ALERT';
        state.error = true;
        state.message = message
    },
    dismissErrorAlert(state) {
        state.status = 'DISMISS_ERROR_ALERT';
        state.error = false;
        state.message = '';
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
