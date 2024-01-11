<template>
<div>

    <v-overlay v-model="loadingtable" class="align-center justify-center">
      <v-progress-circular
        :size="50"
        color="secondary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>

    <v-container>
        <div class="row">
            <div class="col-md-3 col-sm-3 col-xs-12">
                <v-card outlined>
                    <v-card-title>Filters</v-card-title>
                    <v-divider></v-divider>
                    <template>
                        <v-treeview 
                        selection-type="independent"
                        open-all
                        :items="itemstypeFilters" 
                        @update:active="categoriaidchanged" 
                        activatable 
                        open-on-click 
                        color="primary"></v-treeview>
                    </template>
                    <v-divider></v-divider>
                    <v-card-title>Price</v-card-title>
                    <v-range-slider v-model="range" :max="max" :min="min" :height="10" class="align-center" dense></v-range-slider>
                    <v-row class="pa-2" dense>
                        <v-col cols="12" sm="5">
                            <v-text-field :value="range[0]" label="Min" outlined dense @change="$set(range, 0, $event)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <p class="pt-2 text-center">TO</p>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-text-field :value="range[1]" label="Max" outlined dense @change="$set(range, 1, $event)"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-card-title class="pb-0">Customer Rating</v-card-title>
                    <v-container class="pt-0" fluid>
                        <v-checkbox append-icon="mdi-star" label="4 & above" hide-details dense></v-checkbox>
                        <v-checkbox append-icon="mdi-star" label="3 & above" hide-details dense></v-checkbox>
                        <v-checkbox append-icon="mdi-star" label="2 & above" hide-details dense></v-checkbox>
                        <v-checkbox append-icon="mdi-star" label="1 & above" hide-details dense></v-checkbox>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-title class="pb-0">Size</v-card-title>
                    <v-container class="pt-0" fluid>
                        <v-checkbox label="XS" hide-details dense></v-checkbox>
                        <v-checkbox label="S" hide-details dense></v-checkbox>
                        <v-checkbox label="M" hide-details dense></v-checkbox>
                        <v-checkbox label="L" hide-details dense></v-checkbox>
                        <v-checkbox label="XL" hide-details dense></v-checkbox>
                        <v-checkbox label="XXL" hide-details dense></v-checkbox>
                        <v-checkbox label="XXXL" hide-details dense></v-checkbox>
                    </v-container>
                </v-card>
            </div>
            <div class="col-md-9 col-sm-9 col-xs-12">
                <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>

                <v-row dense>
                    <v-col cols="12" sm="8" class="pl-6 pt-6">
                        <small>Showing 1-8 of {{totalitem}} products</small>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select @change="selectchanged" class="pa-0" v-model="select" :items="options" item-text="text" item-value="value" style="margin-bottom: -20px" outlined dense></v-select>
                    </v-col>
                </v-row>

                <v-divider></v-divider>

                <div class="row text-center mt-2">
                    <div class="col-md-3 col-sm-6 col-xs-12" :key="pro.id" v-for="pro in items">
                      <v-hover v-slot:default="{ hover }">
                            <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                                <v-img class="white--text align-end" :aspect-ratio="16 / 9" height="200px" :src="require('../assets/noproduct.png')">
                                    <v-card-title>{{ pro.categoria.nombre }} </v-card-title>
                                    <v-expand-transition>
                                        <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text" style="height: 100%">
                                            <v-btn @click="redirectToProductDetails(pro.id)" v-if="hover"  class="" outlined>Ver</v-btn>
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                                <v-card-text class="text--primary">
                                    <div>
                                        <a @click="redirectToProductDetails(pro.id)" style="text-decoration: none">{{pro.nombre}}</a>
                                    </div>
                                    <div>${{ pro.precio }}</div>
                                </v-card-text>
                            </v-card>
                      </v-hover>
                    </div>
                </div>

                <v-row justify="center">
                  <div class="col-md-8 col-sm-8 col-xs-8 col-10">
                    <v-pagination v-model="page" :length="lastpage" @input="updatePage"></v-pagination>
                  </div>
                </v-row>
            </div>
        </div>
    </v-container>
</div>
</template>

<style>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.8;
    position: absolute;
    width: 100%;
}
</style>

<script>
import ProductosDataService from "../services/ProductosDataService";

export default {
    data: () => ({
        categoriaid:"",
        selectionType:[],
        parametros: {},
        items: [],
        perpage:8,
        totalitem: 0,
        lastpage:0,
        loadingtable: true,
        itemscategoria: [],
        searchcategoria: "",
        loadingcategoria: false,
        formerrors: [],
        loading: false,
        range: [0, 10000],
        select: "",
        options: [
            { text: "Default", value: "" },
            { text: "Price: Low to High", value: "asc" },
            { text: "Price: High to Low", value: "desc" },
        ],
        page: 1,
        breadcrums: [{
                text: "Home",
                disabled: false,
                href: "/",
            },
            {
                text: "Productos",
                disabled: false,
                href: "/productos",
            },
            {
                text: "Telefonos",
                disabled: true,
                href: "/",
            },
        ],
        min: 0,
        max: 10000,
        itemstypeFilters: [{
                id: 1,
                name: "Electronicos",
                children: [{
                        id: 1,
                        name: "Televisores"
                    },
                    {
                        id: 2,
                        name: "Celulares y tablets"
                    },
                    {
                        id: 3,
                        name: "Audífonos"
                    },
                ],
            },
            {
                id: 4,
                name: "Ropa",
                children: [{
                        id: 5,
                        name: "Shirts"
                    },
                    {
                        id: 6,
                        name: "Tops"
                    }
                ],
            },
        ],
    }),
    methods: {
    getDataFromApi() {
            this.loadingtable = true;
            this.items = [];
            this.parametros = {
                    per_page: this.perpage,
                    page: this.page,
                    keyword: "",
                    sortBy:this.select==""?"":"precio",
                    sortDesc:this.select,
                    categoriaid:this.categoriaid?this.categoriaid:""
                }
            ProductosDataService.getAll(this.parametros)
                .then((response) => {
                    this.loadingtable = false;
                    this.items = response.data.data;
                    this.totalitem = response.data.total;
                    this.lastpage = response.data.last_page;
                })
                .catch((e) => {
                    console.log(e);
                    this.loadingtable = false;
                });
    },
    redirectToProductDetails(idproducto) {
      this.$router.push({ name: 'product', params: { id: idproducto } });
    },
    updatePage(value) {
      this.page=value;
      this.getDataFromApi();
    },
    selectchanged() {
      this.getDataFromApi();
    },
    categoriaidchanged(id) {
        this.categoriaid = id
        this.page=1;
        this.getDataFromApi();
    },
    },
    mounted() {
      this.getDataFromApi();
    },
};
</script>
