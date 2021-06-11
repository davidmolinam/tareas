<template>
    <div class="navbar navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">Formularios</router-link>
        <div class="d-flex">
            <router-link v-if="usuarioAutenticado" to="/" class="btn btn-dark">Tareas</router-link>
            <button class="btn btn-dark" v-if="usuarioAutenticado" @click="cerrarSesion">Cerrar Sesión</button>
            <router-link v-if="!usuarioAutenticado" to="/login" class="btn btn-dark">Login</router-link>
            <router-link v-if="!usuarioAutenticado" to="/registro" class="btn btn-dark">Registro</router-link>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(['usuarioAutenticado'])
    },methods:{
        ...mapActions(['cerrarSesion'])
    }
}
</script>