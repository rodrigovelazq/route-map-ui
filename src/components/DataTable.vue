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
        <v-toolbar-title>{{title}}</v-toolbar-title>
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
              class="mb-2">Nuevo
          </v-btn>
        </router-link>
        <v-dialog
            v-model="dialog"
            max-width="290">
          <v-card>
            <v-card-title class="headline">Alerta</v-card-title>
            <v-card-text>
              Desea eliminar el item?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false">
                No
              </v-btn>
              <v-btn
                  color="green darken-1"
                  text
                  @click="deleteItem()">
                Si
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <router-link :to="`/${formUrl}`+item.id" v-if="formUrl">
        <v-icon
            small
            class="mr-2">
          mdi-pencil
        </v-icon>
      </router-link>
      <v-icon
          small
          @click="openDialog(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>

export default {
  name: "DataTable",
  computed: {
    /*...mapGetters({
      data: `${scope}/data`,
      getPagination: `${scope}/pagination`,
    }),*/
    pagination: {
      get() {
        return this.getPagination;
      },
      set(value) {
        const {itemsPerPage, page, totalItems, sortBy, sortDesc} = value;
        this.$emit('getAll', {itemsPerPage, page, totalItems, sortBy, sortDesc})
      }
    },
  },
  methods: {
    /*...mapActions({
      getAll: `${scope}/getAll`,
      delete: `${scope}/delete`,
    }),
    ...mapMutations({
      doDelete: `${scope}/doDelete`,
    }),*/
    deleteItem() {
      this.dialog = false;
      this.$emit('delete')
      //this.delete();
    },
    openDialog(item) {
      this.$emit('doDelete', item)
      //this.doDelete(item)
      this.dialog = true;
    },
  },
  created() {
    this.$emit('getAll', this.pagination)
    //this.getAll(this.pagination);
  },
  props: ['headers', 'title', 'formUrl', 'getAll', 'delete', 'doDelete', 'data', 'getPagination'],
  data() {
    return {
      /*footerprops: {
        'items-per-page-options': [5, 10, 20, 'Todos']
      }
      selected: null,
      */
      dialog: false,
    }
  }
}
</script>

<style scoped>

</style>
