<template>
  <div>
    <v-alert
        v-model="success"
        type="success"
        text
        @click="dismissSuccess">
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
      dismissSuccess: "alerta/dismissSuccess",
      showError: "alerta/showError",
      showSuccess: "alerta/showSuccess"
    })
  },
}
</script>

<style scoped>

</style>
