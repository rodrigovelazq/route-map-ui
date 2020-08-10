import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../components/User.vue'
import UserList from '../components/UserList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/user/:id',
        name: 'User',
        component: User
    },
    {
        path: '/user',
        name: 'User',
        component: User
    }, {
        path: '/userList',
        name: 'UserList',
        component: UserList
    },
]

const router = new VueRouter({
    routes
})

export default router
