<template>
  <v-progress-linear
      v-if="show"
      indeterminate
      color="blue"
  ></v-progress-linear>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
name: "Progress",
  computed: mapGetters({
    show: "progress/show",
  }),
  methods: {
    ...mapActions({
      showProgress: "progress/showProgress",
      hideProgress: "progress/hideProgress"
    }),
  },
}
</script>

<style scoped>

</style>
