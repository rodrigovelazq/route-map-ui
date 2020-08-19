<template>
  <DataTable
      :headers="headers"
      title="Persona"
      formUrl="personaForm/"
      :pagination.sync="pagination"
      :data="data"
      :delete="this.delete"
      :getAll="this.getAll"
      :do-delete="this.doDelete">
  </DataTable>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import DataTable from '../utils/DataTable'

export default {
  name: "PersonaList",
  components: {DataTable},
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
      doDelete: "persona/doDelete",
    }),
    deleteItem() {
      this.dialog = false;
      this.delete();
    },
    openDialog(item) {
      this.doDelete(item)
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
      }
      */
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
