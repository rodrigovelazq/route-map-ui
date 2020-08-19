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
    showSuccess({commit}, message) {
        commit('showSuccessAlert', message)
    },
    dismissSuccess({commit}) {
        commit('dismissSuccessAlert')
    },
    showError({commit}, message) {
        commit('showErrorAlert', message)
    },
    dismissError({commit}) {
        commit('dismissErrorAlert')
    }
}

const mutations = {
    showSuccessAlert(state, message) {
        state.status = 'SHOW_SUCCESS_ALERT';
        state.success = true;
        state.message = message
    },
    dismissSuccessAlert(state) {
        state.status = 'DISMISS_SUCCESS_ALERT';
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
