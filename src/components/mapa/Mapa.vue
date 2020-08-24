<template>
  <div>
    <v-row align="center">
      <v-col class="text-center" cols="12" sm="4">
        <div class="my-2">
          <v-btn large color="primary" @click="traceRoute">Dibujar ruta</v-btn>
        </div>
      </v-col>
    </v-row>
    <GmapMap
        :center="center"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100rem; height: 40rem"
        @click="addMarker($event)"
    >
      <GmapMarker
          :key="index"
          v-for="(marker, index) in markers"
          :position="marker.position"
          :clickable="true"
          :draggable="true"
          @click="toggleInfoWindow({marker,index})"
      />
      <GmapInfoWindow
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="setInfoWinOpen(false)"
      />
      <GmapPolyline v-if="recorrido" :path="recorrido"/>
    </GmapMap>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
  name: 'Mapa',
  computed: {
    ...mapGetters({
      infoWindowPos: "mapa/infoWindowPos",
      recorrido: "mapa/recorrido",
      infoOptions: "mapa/infoOptions",
      markers: "mapa/markers",
      infoWinOpen: "mapa/infoWinOpen",
    }),
  },
  methods: {
    ...mapActions({
      traceRoute: "mapa/traceRoute",
    }),
    ...mapMutations({
      addMarker: "mapa/addMarker",
      toggleInfoWindow: "mapa/toggleInfoWindow",
      setInfoWinOpen: "mapa/setInfoWinOpen",
    }),
  },
  data() {
    return {
      center: {lat: -25.3136249, lng: -57.5646011},
    }
  },
}
</script>

<style>

</style>
