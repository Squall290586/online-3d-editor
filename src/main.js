import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/vuetify";
import * as firebase from "firebase";
import { VueHammer } from 'vue2-hammer'

Vue.use(VueHammer)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch("autoLogin", user);
      }
    });
  }
}).$mount("#app");
