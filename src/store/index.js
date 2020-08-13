import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import persona from './modules/persona'
import alerta from './modules/alerta'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        persona,
        alerta
    }
})
export default store
