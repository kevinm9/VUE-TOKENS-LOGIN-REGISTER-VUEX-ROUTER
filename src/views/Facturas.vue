<template>
  <v-container fluid>

    <v-dialog width="500px" persistent v-model="dialog" v-if="selectItem">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Detalles del Producto</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4">
          <v-row>
            <v-col>
              <h2>Información de la Factura</h2>
              <v-list>
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Factura ID: {{ selectItem.id }}</v-list-item-title>
                      <v-list-item-subtitle>Fecha de emisión: {{ selectItem.created_at }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Total: ${{ selectItem.total }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Cliente: {{ selectItem.cliente?.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Forma de Pago: {{ selectItem.formasdepago?.nombre }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>

          <v-divider class="mt-4 mb-4"></v-divider>

          <h2>Productos</h2>
          <v-data-table :headers="productosHeaders" :items="selectItem.productos" :items-per-page="5">
            <template v-slot:item.subtotal="{ item }">
            $ {{ (item.precio * item.pivot.cantidad).toFixed(2) }}
            </template>
          </v-data-table>

        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-title>
        Facturas
        <v-btn class="ml-2" color="primary" to="/shop">
          +
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field outlined v-model="search"  append-icon="mdi-magnify" label="Buscar"></v-text-field>
      </v-card-title>
      <v-data-table :search="search" :headers="headers" :items="items" :server-items-length="totalitem"
        :loading="loadingtable">

        <template v-slot:item.stock="{ item }">
          <v-chip :color="getColor(item.total)" dark>
            {{ item.stock }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="ver(item)">
            mdi-eye
          </v-icon>
        </template>

      </v-data-table>
    </v-card>

  </v-container>
</template>
<style scoped></style>
<script>
import FacturasDataService from "../services/FacturasDataService";
export default {
  name: "show-facturas",
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
        { text: "cliente", value: "cliente.name" },
        { text: "formasdepago", value: "formasdepago.nombre" },
        { text: 'total', value: 'total', sortable: false },
        { text: "emision", value: "created_at" },
        { text: "productos", value: "productos.length" },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      productosHeaders: [
        { text: "Id", value: "id", sortable: true },
        { text: "nombre", value: "nombre" },
        { text: "precio", value: "precio" },
        { text: "cantidad", value: "pivot.cantidad" },
        { text: "subtotal", value: "subtotal", sortable: false },
      ],
    };
  },
  methods: {
    getDataFromApi() {
      this.search="";
      this.loadingtable = true;
      this.items = [];
      FacturasDataService.getAll().then(({data}) => {
        this.loadingtable = false;
        this.items = data.data;
        this.totalitem = data.data.total;
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
          FacturasDataService.delete(item.id)
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
    },
    ver(item) {
      this.selectItem = item;
      this.dialog = true;
    },
  },
  mounted() {
  this.getDataFromApi();
  },
};
</script>