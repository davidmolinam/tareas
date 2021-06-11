<template>
    <hr>
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
          <td>
            <span v-for="(cat, index) in item.categorias" :key="index">
              {{ (item.categorias.length === index + 1) ? cat : cat + ', ' }}
            </span>
          </td>
          <td>{{item.responsable}}</td>
          <td>{{item.tiempo}}</td>
          <td>
              <button v-if="item.showActions" class="btn btn-danger btn-sm" @click="borrar(item.id)">Eliminar</button>
              <router-link v-if="item.showActions"
                class="btn btn-warning ml-5 btn-sm" 
                :to="{
                    name: 'Editar',
                    params: {
                      id: item.id
                    }
              }">Editar</router-link>
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
        ...mapActions(['borrarTarea','cargarLocalStorage']),
        borrar(id){
          this.borrarTarea(id);
        }
    },
    
}
</script>
