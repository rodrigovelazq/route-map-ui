const state = () => ({
    status: '',
    show: false
})

const getters = {
    show: state => state.show,
}

const actions = {
    showProgress({commit}, text) {
        commit('showProgress', text)
    },
    hideProgress({commit}) {
        commit('hideProgress')
    }
}

const mutations = {
    showProgress(state) {
        state.status = 'SHOW_PROGRESS';
        state.show = true;
    },
    hideProgress(state) {
        state.status = 'HIDE_PROGRESS';
        state.show = false;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
