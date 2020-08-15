const state = () => ({
    status: '',
    //error: false,
    //success: false,
    show: false,
    color: '',
    text: '',
    timeout: 6000,
})

const getters = {
    //success: state => state.success,
    //error: state => state.error,
    show: state => state.show,
    color: state => state.color,
    text: state => state.text,
    timeout: state => state.timeout,
}

const actions = {
    showSucess({commit}, text) {
        commit('showSucessSnackbar', text)
    },
    showError({commit}, text) {
        commit('showErrorSnackbar', text)
    },
    dismiss({commit}) {
        commit('dismissErrorSnackbar')
    }
}

const mutations = {
    showSucessSnackbar(state, text) {
        state.status = 'SHOW_SUCESS_SNACKBAR';
        state.color = 'sucess';
        state.show = true;
        state.text = text;
    },
    showErrorSnackbar(state, text) {
        state.status = 'SHOW_ERROR_SNACKBAR';
        state.color = 'error';
        state.show = true;
        state.text = text;
    },
    dismissErrorSnackbar(state) {
        state.status = 'DISMISS_SNACKBAR';
        state.color = '';
        state.show = false;
        state.text = '';
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
