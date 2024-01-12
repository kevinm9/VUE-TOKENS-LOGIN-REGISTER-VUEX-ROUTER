<template>
  <v-container fluid>


    <v-dialog width="500px" persistent v-model="dialog" eager scrollable>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Ventana modal</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4">
          <v-form ref="form" lazy-validation @submit.prevent="">
            <v-container>
              <div v-if="formerrors.length > 0" class="alert alert-danger">
                <strong>Error!</strong> {{ formerrors }}.
                <button type="button" class="close" aria-label="Close" @click="formerrors = []">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <v-row justify="center" align="center" class="pa-4">
                <v-col cols="12" justify="center">
                  imagen:
                  <v-img :src="imagen ? imagen : require('../assets/noproduct.png')" @error="cargarImagenPorDefecto" alt=""
                    :height="200"></v-img>
                </v-col>
              </v-row>

              <v-file-input outlined @change="onFileChange" label="Imagen del producto" accept="image/*"></v-file-input>
              <v-text-field outlined v-model="producto.nombre" :rules="rulesproducto.nombre"
                label="Nombre"></v-text-field>
              <v-text-field outlined v-model="producto.precio" :rules="rulesproducto.precio"
                label="Precio"></v-text-field>
              <v-text-field outlined v-model="producto.stock" :rules="rulesproducto.stock" label="Stock"></v-text-field>
              <v-autocomplete :rules="rulesproducto.categoria" v-model="producto.categoria_id" :items="itemscategoria"
                :loading="loadingcategoria" :search-input.sync="searchcategoria" hide-no-data hide-selected
                item-text="nombre" item-value="id" label="categoria" placeholder="inicia escribiendo para buscar"
                clearable outlined>
              </v-autocomplete>
              <v-checkbox class="mt-n1" outlined v-model="producto.estado" :rules="rulesproducto.estado"
                label="Activo"></v-checkbox>



              <v-row class="d-flex justify-end mt-4">
                <v-btn v-if="titulo" color="success" :loading="loading" :disabled="loading" class="mr-4" @click="editar">
                  Editar <v-icon right dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn v-else color="primary" :loading="loading" :disabled="loading" class="mr-4" @click="guardar">
                  Guardar
                  <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <v-btn color="error" class="mr-4" @click="reset">
                  Rellenar de nuevo
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>



    <v-card>
      <v-card-title>
        Productos
        <v-btn class="ml-2" color="primary" @click="abrirmodal">
          +
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field outlined @input="buscar" v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :options.sync="options" :server-items-length="totalitem"
        :loading="loadingtable">

        <template v-slot:item.imagen="{ item }">
          <v-img :src="item.imagen" alt="Imagen del producto" max-width="100" max-height="50"></v-img>
        </template>

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

  </v-container>
</template>
<style scoped></style>
<script>
import ProductosDataService from "../services/ProductosDataService";
import CategoriasDataService from "../services/CategoriasDataService";
export default {
  name: "show-productos",
  components: {
  },
  data() {
    return {
      imagen: "",
      imagentable: "",
      imagenfile64: "",
      itemscategoria: [],
      searchcategoria: "",
      loadingcategoria: false,
      formerrors: [],
      loading: false,
      producto: {
        nombre: "",
        estado: true,
        precio: 0,
        stock: 0,
        categoria_id: null,
        categoria: {},
        created_at: "",
        imagen:"",
        imagen64:""
      },
      rulesproducto: {
        nombre: [(v) => !!v || "Campo requerido"],
        estado: [(v) => !!v || "Campo requerido"],
        precio: [(v) => !!v || "Campo requerido"],
        stock: [(v) => !!v || "Campo requerido"],
        categoria: [(v) => !!v || "Campo requerido"],
      },
      dialog: false,
      search: '',
      totalitem: 0,
      items: [],
      loadingtable: true,
      options: {},
      headers: [
        { text: "ID", value: "id", sortable: true },
        { text: "Imagen", value: "imagen", sortable: false },
        { text: "nombre", value: "nombre" },
        { text: "precio", value: "precio" },
        { text: "stock", value: "stock" },
        { text: "categoria", value: "categoria.nombre", sortable: false },
        { text: "created_at", value: "created_at" },
        { text: 'Actions', value: 'actions', sortable: false },
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
    searchcategoria(val) {
      console.log(val);
      // Items have already been loaded
      if (this.itemscategoria.length > 0) return

      // Items have already been requested
      if (this.loadingcategoria) return

      this.loadingcategoria = true

      CategoriasDataService.getAll({
        per_page: -1,
        page: 1
      }).then(({ data }) => {
        this.itemscategoria = data
      })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.loadingcategoria = false))
    },
  },
  methods: {
    buscar() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getDataFromApi();
      }, 800);

    },
    getColor(stock) {
      if (stock < 10) return 'red'
      else if (stock < 30) return 'orange'
      else return 'green'
    },
    getDataFromApi() {
      this.loadingtable = true;
      this.items = [];
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      let urlsortDesc = sortDesc[0] ? 'asc' : 'desc';
      ProductosDataService.getAll({
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
          ProductosDataService.delete(item.id)
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
    guardar() {
      this.formerrors = [];
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true;
      this.cargarimagenbase64();
      ProductosDataService.create(this.producto)
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
            text: 'Guardado!',
          });
          this.exito();
        },
          error => {
            this.formerrors = (error.response && error.response.data.message) || error.message;
            this.loading = false;
          }
        )
        .catch((e) => {
          this.loading = false;
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            background: '#f27474',
            iconColor: 'white',
            color: 'white',
            timerProgressBar: true,
            timer: 3000,
            icon: 'error',
            text: 'Error!',
          });
          console.log(e.data);
        });
    },
    editar() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true;
      this.cargarimagenbase64();
      ProductosDataService.update(this.producto.id, this.producto)
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
            text: 'Editado!',
          });
          this.exito();
        })
        .catch((e) => {
          this.loading = false;
          this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            background: '#f27474',
            iconColor: 'white',
            color: 'white',
            timerProgressBar: true,
            timer: 3000,
            icon: 'error',
            text: 'Error!',
          });
          console.log(e);
        });
    },
    reset() {
      this.$refs.form.reset();
      this.producto.estado = true;
    },
    exito() {
      this.$refs.form.reset();
      this.loading = false;
      this.dialog = false;
      this.getDataFromApi();
    },
    abrirmodal() {
      this.dialog = true;
      this.reset();
      this.producto = {
        nombre: "",
        estado: true,
        precio: 0,
        stock: 0,
        categoria_id: null,
        categoria: {},
        created_at: ""
      };
    },
    editItem(item) {
      this.dialog = true;
      this.producto = { ...item };
      this.producto.imagen64 = "";
      this.imagen = item.imagen;
      this.$refs.form.resetValidation();
    },
    cerrarmodal() {
      this.dialog = false;
      this.getDataFromApi();
    },
    onFileChange(file) {
      try {
        this.imagen = URL.createObjectURL(file);
        this.imagenfile64 = file;
        this.cargarimagenbase64();
      } catch (error) {
        this.cargarImagenPorDefecto();
      }

    },
    cargarImagenPorDefecto() {
      this.imagen = "";
      this.imagenfile64 = null;
    },
    cargarimagenbase64() {
      try {
        if (this.imagenfile64) {
          const reader = new FileReader();
          reader.readAsDataURL(this.imagenfile64);
          reader.onload = (event) => {
            let base64Data = event.target.result
            let txtfile = base64Data.split(',')[1];
            this.producto.imagen64 = txtfile;
          };
        }
      } catch (error) {
        console.log(error);
        this.cargarImagenPorDefecto();
      }



    }
  },
  computed: {
    titulo() { return this.producto?.id ? true : false }
  },
  mounted() {

  },
};
</script>