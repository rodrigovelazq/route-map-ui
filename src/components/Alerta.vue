<template>
  <div>
    <v-alert
        v-model="success"
        type="success"
        text
        @click="dismissSucess">
      {{message}}
    </v-alert>

    <v-alert
        v-model="error"
        text
        type="error"
        @click="dismissError">
      {{message}}
    </v-alert>
  </div>
</template>


<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Alerta",
  computed: mapGetters({
    success: "alerta/success",
    error: "alerta/error",
    message: "alerta/message",
  }),
  methods: {
    ...mapActions({
      dismissError: "alerta/dismissError",
      dismissSucess: "alerta/dismissSucess",
      showError: "alerta/showError",
      showSucess: "alerta/showSucess"
    })
  },
}
</script>

<style scoped>

</style>
