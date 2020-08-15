<template>
  <form>
    <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        @click:append="show1 = !show1"

        v-model="password"
        :error-messages="passwordErrors"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
    ></v-text-field>
    <v-text-field
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        name="input-10-2"
        @click:append="show2 = !show2"

        v-model="password_confirmation"
        :error-messages="passwordConfirmationErrors"
        label="Password Confirmation"
        required
        @input="$v.password_confirmation.$touch()"
        @blur="$v.password_confirmation.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn class="mr-4" @click="toLogin">login</v-btn>
    <!--    <v-btn @click="clear">clear</v-btn>-->
  </form>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  name: "Register",
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    passwordConfirmationErrors() {
      const errors = []
      if (!this.$v.password_confirmation.$dirty) return errors
      !this.$v.password_confirmation.required && errors.push('Password Confirmation is required')
      this.password_confirmation !== this.password && errors.push('Password and Confirmation don\'t match')
      return errors
    },
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const newUser = {
          name: this.name,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        this.$store.dispatch('auth/registerUser', newUser);
      }
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.password = ''
      this.password_confirmation = ''
    },
  },
  data: () => ({
    show1: false,
    show2: false,
    name: '',
    password: '',
    password_confirmation: ''
  }),
  mixins: [validationMixin],

  validations: {
    name: {required},
    password: {required},
    password_confirmation: {required},
  },
}
</script>

<style scoped>

</style>
