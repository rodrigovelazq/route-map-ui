import http from '../../utils/http'
import router from "../../router";

const state = () => ({
    status: '',
    data: [],
    item: {
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        direccion: ''
    },
    error: null
})

const getters = {
    data: state => state.data,
    error: state => state.error,
    item: state => state.item,
}

const actions = {
    getAll({commit, dispatch}) {
        commit('dataRequested')
        http.get('/persona').then(
            resp => {
                commit('dataRequestedSucceeded',  resp.data.data)
            }
        ).catch(err => {
            dispatch('snackbar/showError', 'Ocurrio un error al momento de recuperar las Personas', {root: true});
            commit('dataRequestedFailed', err)
        });
    },
    delete({commit, dispatch}, item) {
        commit('deleteRequested')
        http.delete(`/persona/${item.id}`).then(
            () => {
                commit('deleteSucceded')
                dispatch('getAll');
                dispatch('snackbar/showSucess', 'Se elimino el item satisfactoriamente', {root: true});
            }
        ).catch(err => {
            dispatch('snackbar/showError', 'Ocurrio un error al momento de eliminar el item', {root: true});
            commit('deleteFailed', err)
        });
    },
    getItem({commit, dispatch}, id) {
        commit('itemRequested')
        http.get(`/persona/${id}`).then(
            resp => {
                commit('itemRequestedSucceded', resp.data.data);
            }
        ).catch(err => {
            dispatch('snackbar/showError', 'Ocurrio un error al momento de recuperar el item', {root: true});
            commit('itemRequestedFailed', err)
        });
    },
    save({commit, dispatch}, item) {
        commit('saveRequested')
        http({
            method: item.id ? 'put' : 'post',
            url: item.id ? `/persona/${item.id}` : `/persona`,
            data: item
        }).then(
            resp => {
                commit('saveSucceded', resp.data)
                dispatch('snackbar/showSucess', 'Se guardo el item satisfactoriamente', {root: true});
                router.push('/personaList');
            }
        ).catch(err => {
            dispatch('snackbar/showError', 'Ocurrio un error al momento de guardar el item', {root: true});
            commit('saveFailed', err)
        });
    },
    clear({commit}){
        commit('clear');
    }
}

const mutations = {
    /*GETALL*/
    dataRequested(state) {
        state.status = 'DATA_REQUESTED_PERSONA'
    },
    dataRequestedSucceeded(state, data) {
        state.status = 'DATA_REQUEST_SUCCEEDED_PERSONA';
        state.data = data
    },
    dataRequestedFailed(state, error) {
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
    },
    /*GET*/
    itemRequested(state) {
        state.status = 'ITEM_REQUESTED_PERSONA'
    },
    itemRequestedSucceded(state,item) {
        state.status = 'ITEM_REQUESTED_SUCCEDED_PERSONA';
        state.item = item;
    },
    itemRequestedFailed(state, error) {
        state.status = 'ITEM_REQUESTED_FAILED_PERSONA';
        state.error = error
    },
    /*SAVE*/
    saveRequested(state) {
        state.status = 'SAVE_REQUESTED_PERSONA';
    },
    saveSucceded(state, item) {
        state.status = 'SAVE_SUCCEDED_PERSONA';
        state.item = item;
    },
    saveFailed(state, error) {
        state.status = 'SAVE_FAILED_PERSONA';
        state.error = error
    },
    /*CLEAR*/
    clear(state) {
        state.status = 'CLEAR_PERSONA';
        state.item = {
            nombre: '',
            apellido: '',
            cedula: '',
            telefono: '',
            direccion: ''
        }
    },
    formInputChanged(state, { field, value }) {
        state.status = 'FORM_INPUT_CHANGED'
        state.item[field] = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
