<template>
  <FormTareas v-on:procesar-tarea="procesarTarea" :tarea="tarea"/>
  <ListaTareas />

</template>

<script>
import FormTareas from '../components/FormTareas'
import ListaTareas from '../components/ListaTareas'
import {mapActions} from 'vuex'


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
    ...mapActions(['setTareas']),
    procesarTarea(){
      this.setTareas(this.tarea)
      console.log(this.tarea)
      this.tarea={
        id:'',
        texto: '',
        categorias: [],
        responsable: '',
        tiempo: 0
      }
    }
  },
}
</script>
