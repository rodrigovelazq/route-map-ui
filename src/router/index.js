import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'
import PersonaList from '../components/persona/PersonaList'
import PersonaForm from '../components/persona/PersonaForm'

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
                requiresAuth: true
            }
        },
        {
            path: '/personaForm',
            name: 'PersonaForm',
            component: PersonaForm,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/personaForm/:id',
            name: 'PersonaForm',
            component: PersonaForm,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters["auth/isLoggedIn"]) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router
