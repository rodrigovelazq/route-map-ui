<template>
  <v-data-table
      :headers="headers"
      :items="data"
      :options.sync="pagination"
      :server-items-length="pagination.totalItems"
      :items-per-page="pagination.itemsPerPage"
      :page="pagination.page"
      :sort-by="pagination.sortBy"
      :sort-desc="pagination.sortDesc"
      class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat color="primary white--text">
        <v-toolbar-title>Persona</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <router-link to="/personaForm">
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
      <router-link :to="'/personaForm/'+item.id">
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
import {mapGetters, mapActions, mapMutations} from "vuex";

export default {
  name: "PersonaList",
  computed: {
    ...mapGetters({
      data: "persona/data",
      getPagination: "persona/pagination",
    }),
    pagination: {
      get() {
        return this.getPagination
      },
      set(value) {
        const {itemsPerPage, page, totalItems, sortBy, sortDesc} = value;
        this.getAll({itemsPerPage, page, totalItems, sortBy, sortDesc});
      }
    },
  },
  methods: {
    ...mapActions({
      getAll: "persona/getAll",
      delete: "persona/delete",
    }),
    ...mapMutations({
      paginationChanged: "persona/paginationChanged"
    }),
    deleteItem() {
      this.dialog = false;
      this.delete(this.selected);
    },
    openDialog(item) {
      this.selected = item;
      this.dialog = true;
    },
  },
  created() {
    this.getAll(this.pagination);
  },
  data() {
    return {
      /*footerprops: {
        'items-per-page-options': [5, 10, 20, 'Todos']
      },*/
      selected: null,
      dialog: false,
      headers: [
        {text: 'Nombre', value: 'nombre', sortable: true},
        {text: 'Apellido', value: 'apellido', sortable: true},
        {text: 'Cedula', value: 'cedula', sortable: true},
        {text: 'Telefono', value: 'telefono', sortable: true},
        {text: 'Direccion', value: 'direccion', sortable: true},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
    }
  }
}
</script>

<style scoped>

</style>
