import Vue from "vue";
import Vuex from "vuex";
import Firebase from "firebase/app";
import router from "@/router";
import * as Three from "@/js/three";
import axios from 'axios'

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

const db = Firebase.firestore();

export default new Vuex.Store({
  state: {
    octoprintHTTP: axios.create({
      baseURL: 'http://192.168.0.23',
      headers: {
        'X-Api-Key': '6616E824967245928903C0BB014CF163'
      }
    }),
    scene: undefined,
    user: null,
    isAuthenticated: false,
    db: db,
    files: [],
    file: undefined,
    showUserSettings: false,
    action: 'add',
    initShape: {
      unitSize: 10,
      x: 4,
      y: 4,
      z: 4
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  },
  mutations: {
    setOctoprintHTTP(state, octoprintHTTP) {
      state.octoprintHTTP = octoprintHTTP;
    },
    setScene(state, scene) {
      state.scene = scene;
    },
    setUser(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, auth) {
      state.isAuthenticated = auth;
    },
    setCam(state, cam) {
      state.scene.add(cam);
    },
    clearFiles(state) {
      state.files = []
    },
    addFile(state, file) {
      state.files.push(file);
    },
    setShowUserSettings(state, val) {
      state.showUserSettings = val;
    },
    setFile(state, file) {
      state.file = file
    },
    setAction(state, val) {
      state.action = val
    },
    setInitShape(state, val) {
      state.initShape = val
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
    },
    showUserSettings: context => {
      context.commit('setShowUserSettings', true);
    },
    applyUserSettings: (context, payload) => {
      context.commit('setOctoprintHTTP', axios.create({
        baseURL: 'http://' + payload.ip + '',
        headers: {
          'X-Api-Key': payload.key
        }
      }));
      context.commit('setShowUserSettings', false);
    },
    initScene: (context, payload) => {
      let sizeX = payload.unitSize * payload.x;
      let sizeY = payload.unitSize * payload.y;
      let sizeZ = payload.unitSize * payload.z;

      for (let i = 0; i < payload.x; i++) {
        for (let j = 0; j < payload.y; j++) {
          for (let k = 0; k < payload.z; k++) {
            let x = -sizeX / 2 + i * payload.unitSize + payload.unitSize / 2;
            let y = -sizeY / 2 + j * payload.unitSize + payload.unitSize / 2;
            let z = -sizeZ / 2 + k * payload.unitSize + payload.unitSize / 2;

            context.state.scene.add(
                new Three.shape.Cube(
                    payload.unitSize,
                    new Three.characteristic.Position(x, y, z)
                )
            );
          }
        }
      }
    },
    resetScene: (context, payload) => {
      context.state.scene.reset().then(() =>
          context.dispatch('initScene', payload)
      )
    },
    newShape: (context, payload) => {
      context.commit('setInitShape', payload)
      context.dispatch('resetScene', payload)
    },
    selectCube: (context, payload) => {
      payload.rayCasting.ifPresent(o => o.toggle());
    },
    action: (context, payload) => {
      switch (context.state.action) {
        case 'add':
          context.dispatch('addCube', payload)
          break
        case 'remove':
          context.dispatch('deleteCube', payload)
          break
      }
    },
    addCube: (context, payload) => {
      payload.rayCasting.ifPresent(o => {
        let newObject = o.object.clone();
        newObject.position = newObject
            .position
            .add(o
                .direction
                .multiply(newObject.size));
        context
            .state
            .scene
            .add(newObject);
      });
    },
    deleteCube: (context, payload) => {
      payload.rayCasting.ifPresent(o => context
          .state
          .scene
          .remove(o.object));
    },
    save: context => {

    },
    load: context => {
      context.state.db.collection('collection').where('user', '==', context.state.user.uid).get().then(response => {
        context.commit('clearFiles')
        response.docs.forEach(doc => {
          context.commit('addFile', doc.data())
        })
      })
    },
    selectFile: (context, payload) => {
      context.commit('setFile', payload)
      context.commit('setChooseFile', false)
    },
    print: context => {
      context.state.scene
          .export()
          .then((value) => {
            let data = new FormData();
            data.append("file", value, "file.stl");

            context.state.octoprintHTTP
            // Slice the stl file
                .post(
                    "/api/files/local",
                    data,
                    {
                      headers: {'content-type': 'multipart/form-data'}
                    })

                // Print it
                .then(context.state.octoprintHTTP.post(
                    "/api/files/local/file.stl",
                    {
                      "command": "slice",
                      "slicer": "cura",
                      "gcode": "file.gcode",
                      "printerProfile": "octoprint",
                      "profile": "_default",
                      "print": true
                    }));
          });
    }
  }
});
