<template>
  <v-app>

<v-card elevation="6" class="mx-auto m-4" outlined
    max-width="344">
  <v-card-title>
    Nuevo
  </v-card-title>
  <v-card-subtitle>
sub
  </v-card-subtitle>
  <v-card-text>
sdfsdf
  </v-card-text>
  <v-card-actions>

    <v-btn
        outlined
        rounded
        text
      >
        Button
      </v-btn>

      <v-dialog
      max-width="600px" v-model="dialog"
    >
 
    <v-card>
                <v-card-title class="headline" primary-title>
                  Compose Message
                </v-card-title>
                <v-card-text class="pa-5">
                    <ModalForm propsdata="nuevo" @closemodalt="mensaje" ></ModalForm>
                    <ModalForm2></ModalForm2>
                </v-card-text>
                <v-card-actions class="pa-5">
                    <v-btn class="ml-auto"  outlined color="primary">Cancel</v-btn>
                </v-card-actions>
    </v-card>

    <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Open abrir
          </v-btn>
        </template>
    </v-dialog>

  </v-card-actions>
</v-card>



    <v-card>
      <v-card-title>
        Tutoriales
        <v-btn color="primary" @click="dialog = true">
          +
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
          hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="totalitem"
        :loading="loading">

        <template v-slot:item.published="{ item }">
          <v-chip :color="getColor(item.published)" dark>
            {{ item.published }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="mensaje(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="mensaje">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="mensaje">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>

</template>
<style scoped></style>
<script>

import ModalForm from '@/components/FormFormasdepago.vue'
import ModalForm2 from '@/components/AddTutorial.vue'
import axios from "axios";
export default {
  name: "DatatableComponent",
  components: {
    ModalForm,
    ModalForm2,
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      search:'',
      totalitem: 0,
      items: [],
      loading: true,
      options: {},
      headers: [
        { text: "ID", value: "id", sortable: true },
        { text: "titulo", value: "title" },
        { text: "description", value: "nombre" },
        { text: "published", value: "published" },
        { text: "created_at", value: "created_at" },
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
      axios.get("http://127.0.0.1:8000/api/formasdepagos?per_page=" +
        itemsPerPage +
        "&page=" +
        page +
        "&sortBy=" +
        sortBy +
        "&sortDesc=" +
        urlsortDesc +
        "&title="+
        this.search
      ).then((response) => {
        this.loading = false;
        this.items = response.data.data;
        this.totalitem = response.data.total;
      }).catch((error)=>{
        console.log(error);
        this.loading = false;
      });
    },
    getColor(calories) {
      if (calories > 0) return 'red'
      else if (calories > 1) return 'orange'
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
      this.dialogDelete = true
      this.$swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
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
  },
  mounted() {

  },
};
</script>