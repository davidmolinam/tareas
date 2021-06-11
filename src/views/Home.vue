<template>
  <FormTareas v-on:procesar-tarea="procesarTarea" :tarea="tarea"/>
  <ListaTareas />

</template>

<script>
import FormTareas from '../components/FormTareas'
import ListaTareas from '../components/ListaTareas'
import {mapActions} from 'vuex'
const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    FormTareas,
    ListaTareas
  },

  data() {
    return { 
      tarea: {
        id: '',
        texto: '',
        categorias: [],
        responsable: '',
        tiempo: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTareas','cargarLocalStorage']),
    procesarTarea(){
      this.tarea.id = shortid.generate()
      this.setTareas(this.tarea)
      this.tarea={
        id:'',
        texto: '',
        categorias: [],
        responsable: '',
        tiempo: 0
      }
    }
  },
  created(){
      this.cargarLocalStorage()
    }
}
</script>
