import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import persona from './modules/persona'
import alerta from './modules/alerta'
import snackbar from './modules/snackbar'
import progress from './modules/progress'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        persona,
        alerta,
        snackbar,
        progress
    }
})
export default store
