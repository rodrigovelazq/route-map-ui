<template>
  <v-app>
    <v-card
        v-if="isLoggedIn"
        color="grey lighten-4"
        flat
        tile
    >
      <v-toolbar color="primary" :dark="true" dense>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Route Map v1.0</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="logoutAction">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-main>
      <Progress />
      <Snackbar />
      <v-container class="fill-height">
        <v-row
            align="center"
            justify="center"
        >
          <router-view/>
        </v-row>
      </v-container>


    </v-main>
    <v-navigation-drawer
        color="primary"
        :dark="true"
        v-model="drawer"
        absolute
        temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            link>
          <template v-if="show(item.permiso)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import Snackbar from "./components/utils/snackbar/Snackbar";
import Progress from "./components/utils/progress/Progress";
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'App',
  components: {
    Snackbar,
    Progress
  },
  computed: mapGetters({
    isLoggedIn: "auth/isLoggedIn"
  }),
  methods: {
    ...mapActions({
      logoutAction: "auth/logout"
    }),
    show(permiso){
      if(this.isLoggedIn){
        if(!permiso){
          return true;
        }
        const user = JSON.parse(localStorage.getItem('user'))
        return user.permisos.find(p => p.nombre === permiso) ? true : false
      }
      return false
    }
  },
  created() {
  },
  data() {
    return {
      drawer: false,
      items: [
        {title: 'Home', icon: 'mdi-home', link:'/'},
        {title: 'About', icon: 'mdi-help-circle', link:'/about'},
        {title: 'Persona', icon: 'mdi-human', link:'/personaList', permiso:'index_persona'},
        {title: 'Mapa', icon: 'mdi-map', link:'/mapa'},
      ],
    }
  },
};
</script>
