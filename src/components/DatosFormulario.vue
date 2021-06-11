<template>
    <input type="text" class="form-control my-2"
    placeholder="Nombre" v-model.trim="tarea.texto">

    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" value="platos" id="cb-1" v-model="tarea.categorias">
      <label class="form-check-label" for="cb-1">
        Lavar los platos
      </label>
    </div>
      <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" value="cocina" id="cb-2" v-model="tarea.categorias">
      <label class="form-check-label" for="cb-2">
        Cocinar
      </label>
    </div>
      <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" value="comprar" id="cb-3" v-model="tarea.categorias">
      <label class="form-check-label" for="cb-3">
        Comprar
      </label>
    </div>

    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="david" id="rb-1" v-model="tarea.responsable">
        <label class="form-check-label" for="rb-1">
          David
        </label>
      </div>

      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" value="violeta" id="rb-2"  v-model="tarea.responsable">
        <label class="form-check-label" for="rb-2">
          Violeta
        </label>
      </div>
    </div>
    <div class="mt-2">
       <input type="number" class="form-control my-2"
        placeholder="Tiempo empleado" v-model.number="tarea.tiempo">
    </div>
    <button :disabled="estadoBoton" class="btn btn-dark mt-2 w-100" type="submit">Aceptar</button>
</template>
<script>
export default {
    props:{
        tarea: Object
    },
    computed:{
        estadoBoton(){
        return this.tarea.texto.trim() === '' || this.tarea.lenght === 0 || this.tarea.responsable === '' || this.tarea.tiempo <= 0
        }
    }
}
</script>