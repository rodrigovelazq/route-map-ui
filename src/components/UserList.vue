<template>
  <v-data-table
      :headers="headers"
      :items="users"
      sort-by="calories"
      class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>User</v-toolbar-title>
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
import axios from 'axios';

export default {
  name: "UserList",
  methods: {
    deleteItem() {
      this.dialog = false;
      axios.delete(`http://127.0.0.1:8000/api/user/${this.selected.id}`).then(
          () => axios.get('http://127.0.0.1:8000/api/user').then(res => this.users = res.data.users)
              .catch(err => console.error(err))
      ).catch(err => console.error(err));
    },
    openDialog(item) {
      this.selected = item;
      this.dialog = true;
    }

  },
  created() {
    axios.get('http://127.0.0.1:8000/api/user').then(res => this.users = res.data.users)
        .catch(err => console.error(err));
  },
  data() {
    return {
      selected: null,
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Email', value: 'email', sortable: false},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      users: []
    }
  }
}
</script>

<style scoped>

</style>
