import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: { rutaProtegida: true }
    },
    {
        path: '/editar/:id',
        name: 'Editar',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Editar.vue'),
        meta: { rutaProtegida: true }
    },
    {
        path: '/registro',
        name: 'Registro',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/RegistroLogin.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/RegistroLogin.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.meta.rutaProtegida) {
        if (!store.getters.usuarioAutenticado) {
            next("/login");
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router