import http from '../../utils/http'

const state = () => ({
    status: '',
    data: [],
    error: null
})

const getters = {
    personas: state => state.data,
    error: state => state.error
}

const actions = {
    getAll({commit, dispatch}) {
        commit('dataRequest')
        http.get('/persona').then(
            resp => {
                console.log(resp.data);
                const personaList = resp.data;
                commit('dataRequestSucceeded', personaList.data)
            }
        ).catch(err => {
            dispatch('alerta/showError', 'Ocurrio un error al momento de recuperar las Personas', {root: true});
            commit('dataRequestFailed', err)
        });
    },
    delete({commit, dispatch}, item) {
        commit('deleteRequested')
        http.delete(`/persona/${item.id}`).then(
            resp => {
                console.log(resp.data);
                commit('deleteSucceded')
                dispatch('getAll');
                dispatch('alerta/showSucess', 'Se elimino el item satisfactoriamente', {root: true});
            }
        ).catch(err => {
            dispatch('alerta/showError', 'Ocurrio un error al momento de eliminar el item', {root: true});
            commit('deleteFailed', err)
        });
    }
}

const mutations = {
    /*GETALL*/
    dataRequest(state) {
        state.status = 'DATA_REQUESTED_PERSONA'
    },
    dataRequestSucceeded(state, data) {
        state.status = 'DATA_REQUEST_SUCCEEDED_PERSONA';
        state.data = data
    },
    dataRequestFailed(state, error) {
        state.status = 'DATA_REQUEST_FAILED_PERSONA';
        state.error = error
    },
    /*DELETE*/
    deleteRequested(state) {
        state.status = 'DELETE_REQUESTED_PERSONA'
    },
    deleteSucceded(state) {
        state.status = 'DELETE_SUCCEDED_PERSONA';
    },
    deleteFailed(state, error) {
        state.status = 'DELETE_FAILED_PERSONA';
        state.error = error
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
