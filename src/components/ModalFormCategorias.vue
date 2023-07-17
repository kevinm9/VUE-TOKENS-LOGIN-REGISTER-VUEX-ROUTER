<template>
  <v-form ref="form" lazy-validation>
    <v-container>
      <v-text-field outlined v-model="categoria.nombre" :rules="rulescategoria.nombre" label="Nombre"></v-text-field>
      <v-checkbox v-model="categoria.estado" :rules="rulescategoria.estado" label="Activo"></v-checkbox>
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
</template>

<script>
import CategoriasDataService from "../services/CategoriasDataService";
export default {
  props: {
    propData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      loading: false,
      categoria: {
        nombre: "",
        estado: true
      },
      rulescategoria: {
        nombre: [(v) => !!v || "Campo requerido"],
        estado: [(v) => !!v || "Campo requerido"],
      },
    };
  },
  watch: {
    propData: {
      handler(newValue, oldValue) {
        console.log(newValue?.id, oldValue?.id);
        this.categoria = newValue ? newValue : {
          nombre: "",
          estado: true
        };
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    titulo() { return this.propData?.id ? true : false }
  },
  methods: {
    guardar() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.loading = true;
      CategoriasDataService.create(this.categoria)
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
      CategoriasDataService.update(this.categoria.id, this.categoria)
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
      this.categoria.estado = true;
    },
    exito() {
      this.$refs.form.reset();
      this.loading = false;
      this.$emit('closemodalt');
    },

  },
  updated() {
    this.$refs.form.resetValidation()
  }
};
</script>