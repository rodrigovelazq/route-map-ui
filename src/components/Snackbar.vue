<template>
  <v-snackbar
      :value="show"
      :color="color"
      :timeout="timeout"
      top="top">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
          dark
          text
          v-bind="attrs"
          @click="dismiss">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
name: "Snackbar",
  computed: mapGetters({
    color: "snackbar/color",
    show: "snackbar/show",
    text: "snackbar/text",
    timeout: "snackbar/timeout",
  }),
  methods: {
    ...mapActions({
      dismiss: "snackbar/dismiss",
      showError: "snackbar/showError",
      showSucess: "snackbar/showSucess"
    }),
  },
}
</script>

<style scoped>

</style>
