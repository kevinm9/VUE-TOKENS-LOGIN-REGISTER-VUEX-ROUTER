<template>
  <v-container fluid>
    <!-- Fila 1: Selección de Cliente -->
    <div class="row d-flex justify-space-between no-gutters">
      <v-autocomplete v-model="clienteselect" :items="clientes" :outlined="true" :loading="loadingclientes" rounded
        :search-input.sync="searchclientes" hide-no-data hide-selected dense item-text="name" item-value="id"
        label="cliente" placeholder="inicia escribiendo para buscar clientes" clearable>
      </v-autocomplete>

      <v-btn class=" mb-6 ml-sm-4 ml-md-4 ml-lg-4 align-self-center col-4 col-sm-3 col-md-2 col-12 ml-1 "
        @click="crearNuevoCliente" color="primary">Nuevo
        Cliente</v-btn>
    </div>
    <v-row class="mt-n4">
      <!-- Columna 1: Todos los Productos -->
      <v-col cols="12" sm="6">
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>Productos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field prepend-icon="mdi-magnify" clearable v-model="search" hide-details
              placeholder="busca un producto" single-line>
            </v-text-field>
            <v-btn icon to="/productos">
              <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>

            <v-chip-group v-model="categoriaSeleccionada">
              <v-chip v-for="categoria in categorias" :key="categoria.id" :value="categoria.nombre">{{ categoria.nombre
              }}</v-chip>
            </v-chip-group>


            <v-list class="overflow-y-auto" max-height="370">
              <v-list-item-group>
                <v-list-item v-for="producto in productosFiltrados" :key="producto.id">
                  <v-list-item-avatar>
                    <v-img :src=producto.imagen></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ producto.nombre }}</v-list-item-title>
                    <v-list-item-subtitle>$ {{ producto.precio }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn @click="agregarProducto(producto)" icon>
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Columna 2: Factura -->
      <v-col cols="12" sm="6">
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Factura</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field prepend-icon="mdi-magnify" clearable v-model="searchfactura" hide-details
              placeholder="busca un producto" single-line>
            </v-text-field>
            <v-btn icon @click="productosSeleccionados = []">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="pb-0">

            <v-list class="overflow-y-auto" max-height="300">
              <v-list-item v-for="(producto, index) in productosFiltradosselecionados" :key="index">

                <v-list-item-content>
                  <v-list-item-title>{{ producto.nombre }}</v-list-item-title>
                  <v-list-item-subtitle>subtotal:</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ (producto.precio * producto.cantidad).toFixed(2) }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-row align="center" justify="space-around">
                    <v-text-field min="1" :max="producto.stock" style="height: 80px;width:80px"
                      v-model="producto.cantidad" type="number" outlined hide-details></v-text-field>
                    <v-btn @click="eliminarProductoSeleccionado(producto.id)" icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-row>

                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <div class="d-flex flex-row">
              <!-- Columna con el 80% de ancho -->
              <div class="flex-column col-8">
                <div class="text-end font-weight-bold">sub total:</div>
                <v-divider></v-divider>
                <div class="text-end font-weight-bold">iva 12:</div>
                <v-divider></v-divider>
                <div class="text-end font-weight-bold">valor total:</div>
                <v-divider></v-divider>
              </div>
              <div class="flex-column col-4">
                <div class="text-end">${{ calcularTotal().toFixed(2) }}</div>
                <v-divider></v-divider>
                <div class="text-end">${{ (calcularTotal() * 0.12).toFixed(2) }}</div>
                <v-divider></v-divider>
                <div class="text-end">${{ (calcularTotal() + (calcularTotal() * 0.12)).toFixed(2) }}</div>
                <v-divider></v-divider>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class=" pt-0 d-flex flex-row-reverse">
            <v-btn @click="pagar" color="primary">Pagar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botón de Pagar -->
  </v-container>
</template>

<script>
import ProductosDataService from "../services/ProductosDataService";
import CategoriasDataService from "../services/CategoriasDataService";
import ClientesDataService from "../services/ClientesDataService";
export default {
  data() {
    return {
      searchclientes: "",
      searchfactura: "",
      loadingclientes: false,
      search: "",
      clientes: [],
      clienteselect: "",
      busquedaProducto: "",
      categorias: [],
      categoriaSeleccionada: null,
      productos: [
        {
          id: 1,
          nombre: "Producto 1",
          precio: 10.99,
          categoria: "Electrónica",
        },
        { id: 2, nombre: "Producto 2", precio: 10.99, categoria: "Ropa" },
        { id: 3, nombre: "Producto 3", precio: 10.99, categoria: "Hogar" },
        {
          id: 10,
          nombre: "Producto 10",
          precio: 10.99,
          categoria: "Electrónica",
        },
        { id: 20, nombre: "Producto 20", precio: 10.99, categoria: "Ropa" },
        { id: 30, nombre: "Producto 30", precio: 10.99, categoria: "Hogar" },
        // Agrega más productos con diferentes categorías
      ],
      productosSeleccionados: [],
    };
  },
  watch: {
    searchclientes(val) {
      console.log(val);
      // Items have already been loaded
      if (this.clientes.length > 0) return

      // Items have already been requested
      if (this.clientes) return

      this.loadingclientes = true

      this.getDataclientesFromApi();
    },
  },
  computed: {
    productosFiltradosselecionados() {
      if (this.searchfactura) {
        return this.productosSeleccionados.filter(
          (producto) => producto.nombre.toLowerCase().includes(this.searchfactura.toLowerCase())
        );
      } else {
        return this.productosSeleccionados;
      }
    },
    productosFiltrados() {
      if (this.categoriaSeleccionada) {
        return this.productos.filter(
          (producto) => producto.categoria.nombre === this.categoriaSeleccionada &&
            producto.nombre.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.productos;
      }
    },
  },
  methods: {
    crearNuevoCliente() {
      // Implementa la lógica para crear un nuevo cliente
      alert("Funcionalidad de nuevo cliente por implementar.");
    },
    agregarProducto(producto) {
      const productoSeleccionado = this.productosFiltradosselecionados.find((p) => p.id === producto.id);
      if (productoSeleccionado) {
        if (productoSeleccionado.cantidad < producto.stock) {
          productoSeleccionado.cantidad++;
        }
      } else {
        this.productosSeleccionados.push({
          ...producto,
          cantidad: 1,
        });
      }
    },
    eliminarProductoSeleccionado(id) {
      const index = this.productosSeleccionados.findIndex(producto => producto.id === id);
      if (index !== -1) {
        this.productosSeleccionados.splice(index, 1);
      }
    },
    calcularTotal() {
      return this.productosSeleccionados.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );
    },
    pagar() {
      // Implementa la lógica de pago y facturación
      alert("Funcionalidad de pago y facturación por implementar.");
    },
    getDataFromApi() {
      this.loadingtable = true;
      this.productos = [];
      this.parametros = {
        per_page: -1,
        page: 1,
        keyword: "",
      }
      ProductosDataService.getAll(this.parametros)
        .then((response) => {
          this.loadingtable = false;
          this.productos = response.data.data;
          this.totalitem = response.data.total;
          this.lastpage = response.data.last_page;
        })
        .catch((e) => {
          console.log(e);
          this.loadingtable = false;
        });
    },
    getDatacategoriaFromApi() {
      CategoriasDataService.getAll({
        per_page: -1,
        page: 1
      }).then(({ data }) => {
        this.categorias = data
      }).catch(err => {
        console.log(err)
      }).finally(() => (this.loadingcategoria = false))
    },
    getDataclientesFromApi() {
      ClientesDataService.getAll({
        per_page: -1,
        page: 1
      }).then((response) => {
        this.clientes = response.data.data;
      })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.loadingclientes = false))
    },
  },
  mounted() {
    this.getDataFromApi();
    this.getDatacategoriaFromApi();
    this.getDataclientesFromApi();
  },
};
</script>
