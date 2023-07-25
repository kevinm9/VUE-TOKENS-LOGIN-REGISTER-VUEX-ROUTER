<template>
  <v-app>

    <v-dialog width="500px" persistent v-model="dialog">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Ventana modal</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4">
          <ModalForm :propData="selectItem" @closemodalt="cerrarmodal"></ModalForm>
        </v-card-text>
      </v-card>
    </v-dialog>



    <v-card>
      <v-card-title>
        Categorias
        <v-btn class="ml-2" color="primary" @click="nuevoItem">
          +
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field outlined v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="totalitem"
        :loading="loadingtable">

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
import CategoriasDataService from "../services/CategoriasDataService";
import ModalForm from '@/components/ModalFormCategorias.vue'
export default {
  name: "show-categoria",
  components: {
    ModalForm,
  },
  data() {
    return {
      selectItem: {
        nombre: "",
        estado: false
      },
      dialog: false,
      search: '',
      totalitem: 0,
      items: [],
      loadingtable: true,
      options: {},
      headers: [
        { text: "Id", value: "id", sortable: true },
        { text: "Nombre", value: "nombre" },
        { text: "Fecha de Creación", value: "created_at" },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
    search() {
      this.getDataFromApi();
    }
  },
  methods: {
    getDataFromApi() {
      this.loadingtable = true;
      this.items = [];
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      let urlsortDesc = sortDesc[0] ? 'asc' : 'desc';
      CategoriasDataService.getAll({
        per_page: itemsPerPage,
        page: page,
        sortBy: String(sortBy),
        sortDesc: urlsortDesc,
        keyword: this.search
      }).then(response => {
        this.loadingtable = false;
        this.items = response.data.data;
        this.totalitem = response.data.total;
      }).catch(e => {
        console.log(e);
        this.loadingtable = false;
      })
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
        title: '¿Está seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar a ' + item.nombre + '!'
      }).then((result) => {
        if (result.value) {
          this.loadingtable = true;
          this.items = [];
          CategoriasDataService.delete(item.id)
            .then((response) => {
              this.$swal({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                background: '#a5dc86',
                iconColor: 'white',
                color: 'white',
                timerProgressBar: true,
                timer: 3000,
                icon: 'success',
                text: 'Elimado!',
              });
              this.getDataFromApi();
            })
            .catch((e) => {
              this.$swal.fire(
                'Oops...',
                'Error.',
                'error')
              console.log(e);
            });
        }
      })
    },
    nuevoItem() {
      this.dialog = true;
      this.selectItem = {};
    },
    editItem(item) {
      this.dialog = true;
      this.selectItem = { ...item };
    },
    cerrarmodal() {
      this.dialog = false;
      this.getDataFromApi();
    }
  },
  mounted() {

  },
};
</script>