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
                            <v-text-field outlined v-model="cliente.name" :rules="rulescliente.nombre"
                                label="Nombre"></v-text-field>
                            <v-text-field outlined v-model="cliente.email" :rules="rulescliente.email"
                                label="email"></v-text-field>
                            <v-text-field outlined v-model="cliente.password" :rules="rulescliente.password"
                                label="password"></v-text-field>
                            <v-checkbox v-model="cliente.estado" :rules="rulescliente.estado" label="Activo"></v-checkbox>
                            <v-row class="d-flex justify-end mt-4">
                                <v-btn v-if="titulo" color="success" :loading="loading" :disabled="loading" class="mr-4"
                                    @click="editar">
                                    Editar <v-icon right dark>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn v-else color="primary" :loading="loading" :disabled="loading" class="mr-4"
                                    @click="guardar">
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
                Clientes
                <v-btn class="ml-2" color="primary" @click="abrirmodal">
                    +
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field outlined v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field>
            </v-card-title>
            <v-data-table :search="search" :headers="headers" :items="items" :options.sync="options"
                :server-items-length="totalitem" :loading="loadingtable">

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
import ClientesDataService from "../services/ClientesDataService";
export default {
    name: "show-formasdepagos",
    components: {
    },
    data() {
        return {
            loading: false,
            cliente: {
                nombre: "",
                estado: true
            },
            rulescliente: {
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
                { text: "Nombre", value: "name" },
                { text: "Email", value: "email" },
                { text: "Fecha de Creación", value: "created_at" },
                { text: 'Acción', value: 'actions', sortable: false },
            ],
        };
    },
    methods: {
        getDataFromApi() {
            this.search = "";
            this.loadingtable = true;
            this.items = [];
            ClientesDataService.getAll({
                per_page: -1,
                page: 1,
            })
                .then(response => {
                    const { data } = response.data;
                    this.loadingtable = false;
                    this.items = data;
                    this.totalitem = data.total;
                }).catch(e => {
                    console.log(e);
                    this.loadingtable = false;
                })
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
                    ClientesDataService.delete(item.id)
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
            ClientesDataService.create(this.cliente)
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
            ClientesDataService.update(this.cliente.id, this.cliente)
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
            this.cliente.estado = true;
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
            this.cliente = {};
        },
        editItem(item) {
            this.dialog = true;
            this.cliente = { ...item };
            this.$refs.form.resetValidation();
        },
        cerrarmodal() {
            this.dialog = false;
            this.getDataFromApi();
        }
    },
    computed: {
        titulo() { return this.cliente?.id ? true : false }
    },
    mounted() {
        this.getDataFromApi();
    },
};
</script>