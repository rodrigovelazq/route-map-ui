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
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
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
    <!--    <v-btn @click="clear">clear</v-btn>-->
  </form>
</template>

<script>
import axios from 'axios';
import {validationMixin} from 'vuelidate'
import {required, maxLength, email} from 'vuelidate/lib/validators'
import router from "../router";

export default {
  name: "User",
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
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
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const newUser = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        if (this.$route.params.id) {
          /*axios.put('http://127.0.0.1:8000/api/register', newUser).then(
              () => {
                this.clear();
                router.push('UserList')
              }
          ).catch(err => console.error(err));*/
        } else {
          axios.post('http://127.0.0.1:8000/api/register', newUser).then(
              () => {
                this.clear();
                router.push('UserList')
              }
          ).catch(err => console.error(err));
        }
      }
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
      this.password_confirmation = ''
    },
  },
  created() {
    if (this.$route.params.id) {
      axios.get('http://127.0.0.1:8000/api/user').then(res => {
        let user = res.data.users.find(user =>
            user.id.toString() === this.$route.params.id
        );
        this.name = user.name;
        this.email = user.email;
      }).catch(err => console.error(err));
    }
  },
  data: () => ({
    show1: false,
    show2: false,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }),
  mixins: [validationMixin],

  validations: {
    name: {required, maxLength: maxLength(10)},
    email: {required, email},
    password: {required},
    password_confirmation: {required},
  },
}
</script>

<style scoped>

</style>
