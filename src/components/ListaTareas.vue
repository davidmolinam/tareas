<template>
    {{tareas }}
    <table class="table table-striped table-hover mt-5">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Descripción</th>
          <th scope="col">Tareas</th>
          <th scope="col">Responsable</th>
          <th scope="col">Tiempo Empleado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tareas" :key="item.id">
          <th scope="row">{{item.id}}</th>
          <td>{{item.texto}}</td>
          <td>{{item.categorias.join(', ')}}</td>       
          <td>{{item.responsable}}</td>
          <td>{{item.tiempo}}</td>
          <td>
              <button class="btn btn-danger btn-sm" @click="borrarTarea(item.texto)">Eliminar</button>
              <button class="btn btn-info btn-sm">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
</template>
<script>
import {mapState,mapActions} from 'vuex'

export default {
    computed:{
        ...mapState(['tareas'])
    },
    methods: {
        ...mapActions(['borrarTarea'])
    },
    
}
</script>
