  
<template>
  <v-form ref="form" v-model="valid" lazy-validation>

    <v-container>

      <v-row>

        <v-col cols="12">

          <!-- <v-autocomplete v-model="model" :items="items" :loading="isLoading" :search-input.sync="search" chips clearable
            hide-details hide-selected item-text="name" item-value="id" label="Search for a coin..." solo>
          </v-autocomplete> -->

          <v-autocomplete :items="items2" v-model="model2" item-text="nombre" item-value="id" label="Select a item"
            return-object autocomplete="off">
            <template v-slot:append-item>
              <div v-intersect="endIntersect" />
              Loading more items ...
            </template>
          </v-autocomplete>

        </v-col>

        <v-col cols="12">
          <v-combobox v-model="select" :items="categories" item-text="nombre" item-value="id" label="nombre" multiple
            outlined dense></v-combobox>
        </v-col>
        <v-col cols="12">
          <v-select v-model="select" :items="categories" item-text="nombre" item-value="id" />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="nombre" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item"
            required></v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Email*" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Password*" type="password" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete
            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
            label="Interests" multiple></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>






    <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" :label="propsdata"
      required></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      Reset Form
    </v-btn>

    <v-btn color="warning" @click="resetValidation">
      Reset Validation
    </v-btn>
  </v-form>
</template>
<script>
import axios from "axios";
export default {
  props: ['propsdata'],
  data() {
    return {
      isLoading: false,
      items2: [],
      model2: null,
      search: null,
      tab: null,
      items: [],
      perPage: 5,
      page: 1,
      categories: null,
      valid: true,
      producto: {
        "id": 20,
        "categoria_id": 3,
        "nombre": "rterttttt",
        "precio": "5.00",
        "stock": 450,
        "created_at": "2023-06-28 21:40:58",
        "updated_at": "2023-06-28 21:40:58",
        "categoria": {
          "id": 3,
          "nombre": "escolar posmtan",
          "created_at": "2023-06-06 06:26:03",
          "updated_at": "2023-06-15 03:55:58"
        }
      },
      rulesproducto: {
        nombre: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],

        "categoria_id": 3,
        "nombre": "rterttttt",
        "precio": "5.00",
        "stock": 450,
        "created_at": "2023-06-28 21:40:58",
        "updated_at": "2023-06-28 21:40:58",
        "categoria": {
          "id": 3,
          "nombre": "escolar posmtan",
          "created_at": "2023-06-06 06:26:03",
          "updated_at": "2023-06-15 03:55:58"
        }
      },
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      checkbox: false,

    };
  },


  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      this.isLoading = true

      // Lazily load input items
      fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(res => res.clone().json())
        .then(res => {
          this.items = res
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },



  methods: {
    endIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        this.loadMoreFromApi()
          .then(({ data }) => {
            if(this.items2.length>=data.data.datatotal){return}
            this.items2 = [...this.items2, ...data.data];
          })
          .catch(err => { console.log(err) });
        this.page += 1;
      }
    },
    async loadMoreFromApi() {
      return await axios(`http://127.0.0.1:8000/api/productos?page=${this.page}&per_page=${this.perPage}`)
    },
    onIntersect() {
      console.log('load more...')
      this.page += 1
      this.getDataFromApi()
    },
    getDataFromApi() {
      debugger
      axios.get(`http://127.0.0.1:8000/api/categorias?page=${this.page}&per_page=${this.perPage}`).then((response) => {
        this.categories = response.data.data;
        console.log(response)
      }).catch((error) => {
        console.log(error);
      });
    },
    validate() {
      this.$refs.form.validate()
      this.$emit('closemodalt', "mensaje objecto xd")
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },

  },
  mounted() {
    this.getDataFromApi();
  },
}
</script>