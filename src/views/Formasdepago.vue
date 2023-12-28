<template>
  <v-container fluid>


    <v-dialog width="500px" persistent v-model="dialog" eager>
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
              <v-text-field outlined v-model="formadepago.nombre" :rules="rulesformadepago.nombre"
                label="Nombre"></v-text-field>
              <v-checkbox v-model="formadepago.estado" :rules="rulesformadepago.estado" label="Activo"></v-checkbox>
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
        Formas de pago
        <v-btn class="ml-2" color="primary" @click="abrirmodal">
          +
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field outlined @input="buscar" v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field>
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

  </v-container>
</template>
<style scoped></style>
<script>
import FormasdepagosDataService from "../services/FormasdepagosDataService";
export default {
  name: "show-formasdepagos",
  components: {
  },
  data() {
    return {
      loading: false,
      formadepago: {
        nombre: "",
        estado: true
      },
      rulesformadepago: {
        nombre: [(v) => !!v || "Campo requerido"],
        estado: [(v) => !!v || "Campo requerido"],
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
    }
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
    getDataFromApi() {
      this.loadingtable = true;
      this.items = [];
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      let urlsortDesc = sortDesc[0] ? 'asc' : 'desc';
      FormasdepagosDataService.getAll({
        per_page: itemsPerPage,
        page: page,
        sortBy: String(sortBy),
        sortDesc: urlsortDesc,
        keyword: this.search
      }).then(({data}) => {
        this.loadingtable = false;
        this.items = data;
        this.totalitem = data.total;
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
          FormasdepagosDataService.delete(item.id)
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
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true;
      FormasdepagosDataService.create(this.formadepago)
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
    editar() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true;
      FormasdepagosDataService.update(this.formadepago.id, this.formadepago)
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
      this.formadepago.estado = true;
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
      this.formadepago = {};
    },
    editItem(item) {
      this.dialog = true;
      this.formadepago = { ...item};
      this.$refs.form.resetValidation();
    },
    cerrarmodal() {
      this.dialog = false;
      this.getDataFromApi();
    }
  },
  computed: {
    titulo() { return this.formadepago?.id ? true : false }
  },
  mounted() {

  },
};
</script>