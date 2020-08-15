<template>
  <div>
    <form v-if="!isLoggedIn">
      <v-text-field
          v-model="name"
          label="Name"
          required
      ></v-text-field>
      <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          @click:append="show1 = !show1"
          v-model="password"
          label="Password"
          required
      ></v-text-field>
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn class="mr-4" @click="toRegister">register</v-btn>
      <!--    <v-btn @click="clear">clear</v-btn>-->
    </form>
    <div v-if="isLoggedIn">
      <h1>Ya estas logueado</h1>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn"
    })
  },
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    toRegister() {
      this.$router.push('/register')
    },
    submit() {
      const credential = {
        name: this.name,
        password: this.password
      }
      this.login(credential);
    },
    clear() {
      this.name = ''
      this.password = ''
    },
  },
  data: () => ({
    show1: false,
    name: '',
    password: ''
  }),
}
</script>

<style scoped>

</style>
