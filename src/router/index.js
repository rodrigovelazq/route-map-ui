import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import NoAutorizado from '../views/NoAutorizado'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import PersonaList from '../components/persona/PersonaList'
import PersonaForm from '../components/persona/PersonaForm'
import Mapa from '../components/mapa/Mapa'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/noAutorizado',
            name: 'NoAutorizado',
            component: NoAutorizado,
        },
        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/personaList',
            name: 'PersonaList',
            component: PersonaList,
            meta: {
                requiresAuth: true,
                permiso: 'index_persona'
            }
        },
        {
            path: '/personaForm',
            name: 'PersonaForm',
            component: PersonaForm,
            meta: {
                requiresAuth: true,
                permiso: 'create_persona'
            }
        },
        {
            path: '/personaForm/:id',
            name: 'PersonaForm',
            component: PersonaForm,
            meta: {
                requiresAuth: true,
                permiso: 'update_persona'
            }
        },
        {
            path: '/mapa',
            name: 'Mapa',
            component: Mapa,
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters["auth/isLoggedIn"]) {
            const user = JSON.parse(localStorage.getItem('user'));
            const { permiso } = to.meta;
            if(!permiso || user.permisos.find(p => p.nombre === permiso)){
                next()
                return
            }else{
                next('/noAutorizado')
                return
            }
        }
        next('/login')
    } else {
        next()
    }
})

export default router
