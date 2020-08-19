import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../components/auth/auth'
import persona from '../components/persona/persona'
import alerta from '../components/utils/alerta/alerta'
import snackbar from '../components/utils/snackbar/snackbar'
import progress from '../components/utils/progress/progress'

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
