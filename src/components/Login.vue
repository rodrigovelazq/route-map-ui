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
export default {
  name: "Login",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters["auth/isLoggedIn"]
    }
  },
  methods: {
    toRegister() {
      this.$router.push('/register')
    },
    submit() {
      const credential = {
        name: this.name,
        password: this.password
      }
      this.$store.dispatch('auth/login', credential)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err));
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
