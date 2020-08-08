<template>
  <div>
    <form @submit="addUser">
      <input type="text" v-model="name" name="name" placeholder="Name...">
      <input type="text" v-model="email" name="email" placeholder="Email...">
      <input type="password" v-model="password" name="password" placeholder="Password...">
      <input type="password" v-model="password_confirmation" name="password_confirmation" placeholder="Password Confirmation...">

      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  data() {
    return {
      title: ''
    }
  },
  methods: {
    addUser(e) {
      e.preventDefault();
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      this.$emit('add-user', newUser);
      this.title = '';
      this.email = '';
      this.password = '';
      this.password_confirmation = '';
    }
  }
}
</script>

<style scoped>

</style>
