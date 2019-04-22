import Vue from "vue";
import Vuex from "vuex";
import Firebase from "firebase/app";
import router from "@/router";
import * as Three from "@/js/three";
import {HTTP} from '@/http'
import { saveAs } from 'file-saver';

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
        scene: undefined,
        user: null,
        isAuthenticated: false,
        db: db,
        files: [],
        file: undefined,
        chooseFile: false,
        action: 'add'
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        }
    },
    mutations: {
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
        setChooseFile(state, val) {
            state.chooseFile = val;
        },
        setFile(state, file) {
            state.file = file
        },
        setAction(state, val) {
            state.action = val
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
        resetScene: (context) => {
            context.state.scene.reset()
            context.dispatch('initScene', {
                unitSize: 4,
                x: 5,
                y: 1,
                z: 10
            })
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
        chooseFile: context => {
            context.commit('setChooseFile', true)
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

                    saveAs(value, 'file.stl')

                    HTTP
                        .post(
                            "/api/files/local",
                            data,
                            {
                                headers: {'content-type': 'multipart/form-data'}
                            })
                        .then(HTTP.post(
                            "/api/files/local/file.stl",
                            {
                                "command": "slice",
                                "slicer": "cura",
                                "gcode": "file.gcode",
                                "printerProfile": "octoprint",
                                "profile": "_default",
                                "print": true
                            }))

                        .then((a1, a2, a3) => console.log(a1, a2, a3));
                });
        }
    }
});
