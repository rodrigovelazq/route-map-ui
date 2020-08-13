<template>
  <v-data-table
      :headers="headers"
      :items="personas"
      sort-by="calories"
      class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Persona</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <router-link to="/user">
          <v-btn
              color="primary"
              dark
              class="mb-2">New Item
          </v-btn>
        </router-link>

        <v-dialog
            v-model="dialog"
            max-width="290">
          <v-card>
            <v-card-title class="headline">Alerta</v-card-title>
            <v-card-text>
              Desea eliminar el usuario?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
              >
                No
              </v-btn>

              <v-btn
                  color="green darken-1"
                  text
                  @click="deleteItem()"
              >
                Si
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <router-link :to="'/user/'+item.id">
        <v-icon
            small
            class="mr-2"
        >
          mdi-pencil
        </v-icon>
      </router-link>
      <v-icon
          small
          @click="openDialog(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "PersonaList",
  computed: mapGetters({
    personas: "persona/personas"
  }),
  methods: {
    ...mapActions({
      getAll: "persona/getAll",
      delete: "persona/delete"
    }),
    deleteItem() {
      this.dialog = false;
      this.delete(this.selected);
    },
    openDialog(item) {
      this.selected = item;
      this.dialog = true;
    }
  },
  created() {
    this.getAll();
  },
  data() {
    return {
      selected: null,
      dialog: false,
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        {text: 'Apellido', value: 'apellido', sortable: false},
        {text: 'Cedula', value: 'ci', sortable: false},
        {text: 'Telefono', value: 'telefono', sortable: false},
        {text: 'Direccion', value: 'direccion', sortable: false},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
    }
  }
}
</script>

<style scoped>

</style>
