<template>
    <form @submit.prevent="updateTarea(this.tarea)">
      <DatosFormulario :tarea="tarea"/>
  </form>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import DatosFormulario from '../components/DatosFormulario'
export default {
    components:{
      DatosFormulario
    },
    computed:{
        ...mapState(['tarea'])
    },
    methods:{
        ...mapActions(['setTarea','updateTarea']),
    },
    created(){
        this.setTarea(this.$route.params.id)
    }
    
}
</script>