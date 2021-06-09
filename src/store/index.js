import { createStore } from 'vuex'

export default createStore({
  state: {
    tareas: [],
    tarea: {
        id:'',
        texto: '',
        categorias: [],
        responsable: '',
        tiempo: 0
      }
  },
  mutations: {
    set(state,payload){
      state.tareas.push(payload)
    },
    eliminar(state,id){
      state.tareas =state.tareas.filter(f => f.texto != id)
    }
  },
  actions: {
    setTareas({commit}, tarea){
      commit('set',tarea)
    },
    borrarTarea({commit}, id){
      commit('eliminar',id)
    }
  },
  modules: {
  }
})
