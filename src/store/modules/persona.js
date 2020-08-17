import http from '../../utils/http'
import router from "../../router";
import {formMutationsForScope} from "../../helpers/form";
import {dataTableMutationsForScope} from "../../helpers/datatable";
import {deleteMutationForScope} from "../../helpers/delete";

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
    pagination: {
        page: 1,
        itemsPerPage: 5,
        totalItems: 0,
        sortBy: ['id'],
        sortDesc: [false],
    },
    selected: null,
    error: null
})

const getters = {
    data: state => state.data,
    error: state => state.error,
    item: state => state.item,
    pagination: state => state.pagination,
    selected: state => state.selected
}

const actions = {
    getAll({commit, dispatch}, pagination) {
        commit('dataRequested')
        const {page, itemsPerPage, sortBy, sortDesc} = pagination;
        const params = (sortBy && sortDesc) ? {page, itemsPerPage, 'sortBy': sortBy[0], 'sortDesc' : sortDesc[0]} : {page, itemsPerPage};
        http.get('/persona', {params}).then(resp => {
                const {data, total} = resp.data.data;
                commit('paginationChanged', {...pagination, totalItems: total})
                commit('dataRequestedSucceeded', data)
            }
        ).catch(err => {
            dispatch('snackbar/showError', 'Ocurrio un error al momento de recuperar las Personas', {root: true});
            commit('dataRequestedFailed', err)
        });
    },
    delete({commit, dispatch, getters}) {
        commit('deleteRequested')
        http.delete(`/persona/${getters.selected.id}`).then(
            () => {
                commit('deleteSucceeded')
                commit('paginationReset');
                dispatch('getAll', getters.pagination);
                dispatch('snackbar/showSuccess', 'Se elimino el item satisfactoriamente', {root: true});
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
                commit('itemRequestedSucceeded', resp.data.data);
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
                commit('saveSucceeded', resp.data)
                dispatch('snackbar/showSuccess', 'Se guardo el item satisfactoriamente', {root: true});
                router.push('/personaList');
            }
        ).catch(err => {
            dispatch('snackbar/showError', 'Ocurrio un error al momento de guardar el item', {root: true});
            commit('saveFailed', err)
        });
    },
    cleanForm({commit}) {
        commit('cleanForm');
    }
}

const mutations = {
    ...deleteMutationForScope('persona'),
    ...dataTableMutationsForScope('persona'),
    ...formMutationsForScope('persona'),
    /*CLEAR*/
    cleanForm(state) {
        state.status = 'persona_clean_form';
        state.item = {
            nombre: '',
            apellido: '',
            cedula: '',
            telefono: '',
            direccion: ''
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
