import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

const opts1 = {theme: {
  themes: {
    light: {
      primary: '#2D3753',
      secondary: '#2D3753',
      accent: '#3AE3D6',
      error: '#f44336',
      info: '#2d3753',
      success: '#7a904a',
      warning: '#f78012',
    }
  },
},};


const opts2 = {
    theme: {
      themes: {
        light: {
          primary: '#ee44aa',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
      },
    },
  }

export default new Vuetify(opts)
