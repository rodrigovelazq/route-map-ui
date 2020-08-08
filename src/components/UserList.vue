<template>
  <div>
    <div v-for="user in users" :key="user.id">
      <p>{{user.name}} - {{user.email}}
        <button @click="$emit('del-user', user.id)">X</button></p>
    </div>
  </div>
</template>

<script>

export default {
  name: "UserList",
  props: ["users"]
}
</script>

<style scoped>

</style>
