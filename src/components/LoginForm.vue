<template>
    <h1 class="my-5">{{nombreCabecera}}</h1>
    <form @submit.prevent="submit()">
        <input v-model.trim="email" class="form-control my-2" type="email" placeholder="Email">
        <input v-model.trim="pass" class="form-control my-2" type="password" placeholder="Contraseña">
        <input v-model.trim="pass2" v-show="!login" class="form-control my-2" type="password" placeholder="Repetir Contraseña">
        <button :disabled="diableButton" class="btn btn-primary" type="submit">{{nombreBoton}}</button>
    </form>
</template>
<script>
import { mapActions } from 'vuex'
export default {

    props:{
        login: Boolean
    },
    data() {
        return {
            email: '',
            pass: '',
            pass2: ''
        }
    },
    computed:{
        nombreCabecera(){
            return this.login ? 'Inicio de sesión' : 'Registro de usuarios'
        },
         nombreBoton(){
            return this.login ? 'Log In' : 'Registrar'
        },
        diableButton(){
             return this.login ? (!this.isEmailValid() || !this.isValidString(this.pass,6)) : 
                 (!this.isEmailValid() || !this.isValidString(this.pass,6) || this.pass2.trim() !=  this.pass.trim())
        }
    },
    methods: {
        ...mapActions(['registrarUsuario','loginUsuario']),
        isEmailValid() {
            const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
            return (this.email.trim().length === 0)? false : regEx.test(this.email.trim()) ? true : false;
        },
        isValidString(text,minValue){
            return text.trim().length >= minValue 
        },
        submit(){
            if(this.login){
                this.loginUsuario({email: this.email, password: this.pass})
            }else{
                this.registrarUsuario({email: this.email, password: this.pass}) 
            }
            this.email= ''
            this.pass= ''
            this.pass2= ''
        }

  }
    
}
</script>