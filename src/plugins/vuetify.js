import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/src/stylus/app.styl'
import fr from 'vuetify/es5/locale/fr'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    locales: { fr },
    current: 'fr'
  },
})
