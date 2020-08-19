<template>
  <form>
    <v-text-field
        v-bind:value="this.item.nombre"
        :error-messages="nombreErrors"
        label="Nombre"
        required
        v-on:input="formInputChanged({field: 'nombre', value: $event})"
        @input="$v.item.nombre.$touch()"
        @blur="$v.item.nombre.$touch()"
    ></v-text-field>
    <v-text-field
        v-bind:value="item.apellido"
        :error-messages="apellidoErrors"
        label="Apellido"
        required
        v-on:input="formInputChanged({field: 'apellido', value: $event})"
        @input="$v.item.apellido.$touch()"
        @blur="$v.item.apellido.$touch()"
    ></v-text-field>
    <v-text-field
        v-bind:value="item.cedula"
        v-on:input="formInputChanged({field: 'cedula', value: $event})"
        label="Cédula"
    ></v-text-field>
    <v-text-field
        v-bind:value="item.telefono"
        v-on:input="formInputChanged({field: 'telefono', value: $event})"
        label="Teléfono"
    ></v-text-field>
    <v-text-field
        v-bind:value="item.direccion"
        v-on:input="formInputChanged({field: 'direccion', value: $event})"
        label="Dirección"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit" color="primary" :disabled="$v.$invalid">guardar</v-btn>
    <v-btn class="mr-4" @click="$router.go(-1)" color="error">cancelar</v-btn>
  </form>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "PersonaForm",
  computed: {
    ...mapGetters({
      item: "persona/item",
    }),
    nombreErrors() {
      const errors = []
      if (!this.$v.item.nombre.$dirty) return errors
      !this.$v.item.nombre.required && errors.push('El nombre es requerido.')
      return errors
    },
    apellidoErrors() {
      const errors = []
      if (!this.$v.item.apellido.$dirty) return errors
      !this.$v.item.apellido.required && errors.push('El apellido es requerido.')
      return errors
    },
  },
  methods: {
    ...mapActions({
      save: "persona/save",
      getItem: "persona/getItem",
    }),
    ...mapMutations({
      formInputChanged: "persona/formInputChanged"
    }),
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.save(this.item);
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getItem(this.$route.params.id);
    }
  },
  mixins: [validationMixin],
  validations: {
    item: {
      nombre: {required},
      apellido: {required}
    },
  },
}
</script>

<style scoped>

</style>
