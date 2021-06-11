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
        user: null,
        error: {tipo: null, message: null}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        tarea(state, payload) {
            if (!state.tareas.find(f => f.id === payload)) {
                router.push("/")
                return
            }
            state.tarea = state.tareas.find(f => f.id === payload)
        },
        async recuperarDatos(state){
            try {
                const res = await fetch(`https://tareas-sin-auth-default-rtdb.europe-west1.firebasedatabase.app/tareas.json?auth=${state.user.idToken}`)
                const resultData = await res.json()
                const arrayTareas = []
                let showActions= false
                for (let userId in resultData) {
                    showActions = userId === state.user.localId
                    for (let tarea in resultData[userId]) {
                        const newTarea = resultData[userId][tarea]
                        newTarea.showActions=showActions
                        arrayTareas.push(newTarea)
                    }
                }
                state.tareas = arrayTareas
            } catch (err) {
                console.error(err)
            }

        },
        setError(state,payload){
            if(payload === null){
                return state.error = {tipo: null, message: null}
            }
            if(payload.message === 'EMAIL_NOT_FOUND'){
                return state.error = {tipo: 'email', message: "El usuario no existe"}
            }
            if(payload.message === 'INVALID_PASSWORD'){
                return state.error = {tipo: 'password', message: "Contraseña incorrecta"}
            }
            if(payload.message === 'EMAIL_EXISTS'){
                return state.error = {tipo: 'email', message: "El usuario ya está registrado"}
            }

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
            commit('recuperarDatos')
        },
        async setTareas({ commit, state }, tarea) {
            try {
                await fetch(`https://tareas-sin-auth-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tarea)
                })
                commit('recuperarDatos')
            } catch (err) {
                console.error(err)
            }

        },
        async borrarTarea({ commit, state }, id) {
            try {
                await fetch(`https://tareas-sin-auth-default-rtdb.europe-west1.firebasedatabase.app/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
                    method: 'DELETE'
                })

                commit('recuperarDatos')

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
                    return commit('setError',userDB.error)
                }
                commit('setUser', userDB)
                commit('setError',null)
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
                    return commit('setError',userDB.error)
                }
                commit('setUser', userDB)
                commit('setError',null)
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