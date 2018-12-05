import Vue from "vue";
import Vuex from "vuex";
import Firebase from "firebase/app";
import router from "@/router";

Vue.use(Vuex);

let config = {
  apiKey: "AIzaSyDA9iHmsWwgRcEyuol-6vCgLfhb7c_bszA",
  authDomain: "online-3d-editor.firebaseapp.com",
  databaseURL: "https://online-3d-editor.firebaseio.com",
  projectId: "online-3d-editor",
  storageBucket: "online-3d-editor.appspot.com",
  messagingSenderId: "355803834218"
};
Firebase.initializeApp(config);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    db: Firebase.firestore()
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, auth) {
      state.isAuthenticated = auth;
    }
  },
  actions: {
    setUser: (context, user) => {
      context.commit("setUser", user);
    },
    autoLogin: (context, user) => {
      context.commit("setUser", user);
      context.commit("setIsAuthenticated", true);
      router.push("/editor");
    },
    userLogin: context => {
      Firebase.auth()
        .signInWithPopup(new Firebase.auth.GoogleAuthProvider())
        .then(user => {
          context.commit("setUser", user);
          context.commit("setIsAuthenticated", true);
          router.push("/editor");
        })
        .catch(() => {
          context.commit("setUser", null);
          context.commit("setIsAuthenticated", false);
          router.push("/");
        });
    },
    userSignOut: context => {
      Firebase.auth()
        .signOut()
        .then(() => {
          context.commit("setUser", null);
          context.commit("setIsAuthenticated", false);
          router.push("/");
        })
        .catch(() => {
          context.commit("setUser", null);
          context.commit("setIsAuthenticated", false);
          router.push("/");
        });
    }
  }
});
