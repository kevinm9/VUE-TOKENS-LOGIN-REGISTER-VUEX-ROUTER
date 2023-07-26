<template>
  <v-app>

    <v-dialog max-width="600px" v-model="dialog">
          <v-card>
            <v-card-title class="headline" primary-title>
              Modal
            </v-card-title>
            <v-card-text class="pa-5">
              <ModalForm propsdata="nuevo" @closemodalt="mensaje"></ModalForm>
            </v-card-text>
            <v-card-actions class="pa-5">
              <v-btn class="ml-auto" outlined color="primary">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>



    <v-card>
      <v-card-title>
        Productos
        <v-btn class="ml-2" color="primary" @click="dialog = true">
          +
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" 
        append-icon="mdi-magnify" 
        label="Search" 
        single-line 
        hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="totalitem"
        :loading="loading">

        <template v-slot:item.stock="{ item }">
          <v-chip :color="getColor(item.stock)" dark>
            {{ item.stock }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
    </v-card>

  </v-app>
</template>
<style scoped></style>
<script>

import ModalForm from '@/components/ModalFormProductos.vue'
import axios from "axios";
export default {
  name: "show-productos",
  components: {
    ModalForm,
  },
  data() {
    return {
      dialog: false,
      search: '',
      totalitem: 0,
      items: [],
      loading: true,
      options: {},
      headers: [
        { text: "ID", value: "id", sortable: true },
        { text: "Nombre", value: "nombre" },
        { text: "Precio", value: "precio" },
        { text: "Stock", value: "stock" },
        { text: "Categoria", value: "categoria.nombre", sortable: false },
        { text: "Created_at", value: "created_at" },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi()
      },
      deep: true,
    },
    search() {
      this.getDataFromApi();
    }
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      let urlsortDesc = sortDesc[0] ? 'asc' : 'desc';
      axios.get("http://127.0.0.1:8000/api/productos?per_page=" +
        itemsPerPage +
        "&page=" +
        page +
        "&sortBy=" +
        sortBy +
        "&sortDesc=" +
        urlsortDesc +
        "&keyword=" +
        this.search
      ).then((response) => {
        this.loading = false;
        this.items = response.data.data;
        this.totalitem = response.data.total;
      }).catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
    getColor(stock) {
      if (stock < 10) return 'red'
      else if (stock < 30) return 'orange'
      else return 'green'
    },
    mensaje(item) {
      this.dialog = false;
      alert(item);
      this.$toast("My toast content", {
        timeout: 2000
      });
    },
    deleteItem(item) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete ' + item.nombre + '!'
      }).then((result) => {
        if (result.value) {
          this.$swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },
    editItem(item) {
      this.dialog = true;
      
    }
  },
  mounted () {
    console.log("cargo");
  },
};
</script>