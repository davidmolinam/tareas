<template>
    <form @submit.prevent="$emit('procesar-tarea')">
      <DatosFormulario :tarea="tarea"/>
  </form>
</template>
<script>
import DatosFormulario from './DatosFormulario'
export default {
    components:{
      DatosFormulario
    },
    props:{
        tarea: Object
    }
}
</script>
