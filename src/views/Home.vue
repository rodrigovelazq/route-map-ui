<template>
  <div id="app">
    <HelloWorld msg="User List"/>
    <UserForm v-on:add-user="addUser"/>
    <UserList v-bind:users="users" v-on:del-user="deleteUser"/>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import UserList from '../components/UserList.vue';
import UserForm from "../components/UserForm";
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    UserForm,
    HelloWorld,
    UserList,
  },
  methods: {
    deleteUser(id) {
      axios.delete(`http://127.0.0.1:8000/api/user/${id}`).then(
          () => axios.get('http://127.0.0.1:8000/api/user').then(res => this.users = res.data.users)
              .catch(err => console.error(err))
      ).catch(err => console.error(err));
    },
    addUser(newUser) {
      axios.post('http://127.0.0.1:8000/api/register', newUser).then(
          () => axios.get('http://127.0.0.1:8000/api/user').then(res => this.users = res.data.users)
              .catch(err => console.error(err))
      ).catch(err => console.error(err));
    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/user').then(res => this.users = res.data.users)
        .catch(err => console.error(err));
  },
  data() {
    return {
      users: []
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
