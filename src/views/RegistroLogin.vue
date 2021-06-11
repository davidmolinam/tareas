<template>
    <LoginForm :login="tipoLogin"/>
</template>
<script>
import LoginForm from '../components/LoginForm'
export default {
    components: {
        LoginForm
    },
    computed:{
        tipoLogin(){
            console.log(this.$route.path.includes('/login'))
            return this.$route.path.includes('/login') ? true : false
        }
    }
}
</script>