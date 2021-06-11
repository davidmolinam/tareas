import { createStore } from 'vuex'
import router from '../router'

export default createStore({
    state: {
        tareas: [],
        tarea: {
            id: '',
            texto: '',
            categorias: [],
            responsable: '',
            tiempo: 0
        },
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        set(state, payload) {
            state.tareas.push(payload)
        },
        tarea(state, payload) {
            if (!state.tareas.find(f => f.id === payload)) {
                router.push("/")
                return
            }
            state.tarea = state.tareas.find(f => f.id === payload)
        },
        cargar(state, payload) {
            state.tareas = payload
        }
    },
    actions: {
        cerrarSesion({ commit }) {
            commit('setUser', null)
            router.push("/login")
            localStorage.removeItem('usuario')
        },
        async cargarLocalStorage({ commit, state }) {

            if (localStorage.getItem('usuario')) {
                commit('setUser', JSON.parse(localStorage.getItem('usuario')))
            } else {
                return commit('setUser', null)
            }
            try {
                const res = await fetch(`https://tareas-sin-auth-default-rtdb.europe-west1.firebasedatabase.app/tareas.json?auth=${state.user.idToken}`)
                const resultData = await res.json()
                const arrayTareas = []
                for (let userId in resultData) {
                    for (let tarea in resultData[userId]) {
                        arrayTareas.push(resultData[userId][tarea])
                    }
                }
                commit('cargar', arrayTareas)
            } catch (err) {
                console.error(err)
            }
        },
        async setTareas({ commit, state }, tarea) {
            try {
                await fetch(`https://tareas-sin-auth-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tarea)
                })
                commit('set', tarea)
            } catch (err) {
                console.error(err)
            }

        },
        async borrarTarea({ commit, state }, id) {
            try {
                await fetch(`https://tareas-sin-auth-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
                    method: 'DELETE'
                })

                const res = await fetch(`https://tareas-sin-auth-default-rtdb.europe-west1.firebasedatabase.app/tareas.json?auth=${state.user.idToken}`)
                const resultData = await res.json()
                const arrayTareas = []
                for (let userId in resultData) {
                    for (let tarea in resultData[userId]) {
                        arrayTareas.push(resultData[userId][tarea])
                    }
                }
                commit('cargar', arrayTareas)

            } catch (err) {
                console.error(err)
            }

        },
        setTarea({ commit }, id) {
            commit('tarea', id)
        },
        async updateTarea({ commit, state }, payload) {
            try {
                await fetch(`https://tareas-sin-auth-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${payload.id}.json?auth=${state.user.idToken}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })

                router.push("/")

            } catch (err) {
                console.error(err)
            }

        },
        async registrarUsuario({ commit }, payload) {

            try {
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQW46Kn7yNGruFSWZnLYcRKoErp3ZByX0', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true
                    })
                })

                const userDB = await res.json()
                if (userDB.error) {
                    console.log(userDB.error)
                    return
                }
                commit('setUser', userDB)
                localStorage.setItem('usuario', JSON.stringify(userDB))
                router.push("/")
            } catch (error) {
                console.log(error)
            }

        },
        async loginUsuario({ commit }, payload) {

            try {
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQW46Kn7yNGruFSWZnLYcRKoErp3ZByX0', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json()
                if (userDB.error) {
                    console.log(userDB.error)
                    return
                }
                commit('setUser', userDB)
                localStorage.setItem('usuario', JSON.stringify(userDB))
                router.push("/")
            } catch (error) {
                console.log(error)
            }
        }
    },
    getters: {
        usuarioAutenticado(state) {
            return !!state.user
        }
    },
    modules: {}
})