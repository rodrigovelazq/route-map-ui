<template>
  <form>
    <v-text-field
        v-model="nombre"
        :error-messages="nombreErrors"
        label="Nombre"
        required
        @input="$v.nombre.$touch()"
        @blur="$v.nombre.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="item.apellido"
        :error-messages="apellidoErrors"
        label="Apellido"
        required
        @input="$v.apellido.$touch()"
        @blur="$v.apellido.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="item.cedula"
        label="Cédula"
    ></v-text-field>
    <v-text-field
        v-model="item.telefono"
        label="Teléfono"
    ></v-text-field>
    <v-text-field
        v-model="item.direccion"
        label="Dirección"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit" color="primary">guardar</v-btn>
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
      if (!this.$v.nombre.$dirty) return errors
      !this.$v.nombre.required && errors.push('El nombre es requerido.')
      return errors
    },
    apellidoErrors() {
      const errors = []
      if (!this.$v.apellido.$dirty) return errors
      !this.$v.apellido.required && errors.push('El apellido es requerido.')
      return errors
    },
    nombre: {
      get() {
        return this.item.nombre
      },
      set(value) {
        this.formInputChanged({field: 'nombre', value: value})
      }
    },
    apellido: {
      get() {
        return this.item.apellido
      },
      set(value) {
        this.formInputChanged({field: 'apellido', value: value})
      }
    },
    cedula: {
      get() {
        return this.item.cedula
      },
      set(value) {
        this.formInputChanged({field: 'cedula', value: value})
      }
    },
    telefono: {
      get() {
        return this.item.telefono
      },
      set(value) {
        this.formInputChanged({field: 'telefono', value: value})
      }
    },
    direccion: {
      get() {
        return this.item.direccion
      },
      set(value) {
        this.formInputChanged({field: 'direccion', value: value})
      }
    }
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
    nombre: {required},
    apellido: {required},
  },
}
</script>

<style scoped>

</style>
