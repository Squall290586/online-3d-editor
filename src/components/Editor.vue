<template>
  <div style="width: 100%; height: 100%; ">
    <options></options>
    <div @mousedown="onClick" ref="canvas" style="width: 100%; height: 100%;" v-hammer:tap="onClick"></div>
    <v-layout class="controls" column fill-height>
      <div ref="joystick"></div>
      <slider :init="zoom" @zoom="onZoom"></slider>
    </v-layout>
    <v-dialog
            v-model="dialog"
            width="500"
    >
      <v-card>
        <v-card-title class="headline" primary-title>Sauvegardes</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-tile :key="idx" @click="$store.dispatch('selectFile', file)" v-for="(file, idx) in files">
              <v-list-tile-content>{{file.createdAt}}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import Options from "./Options";
  import * as Three from "@/js/three";
  import nipplejs from "nipplejs";
  import * as Optional from "optional-js";
  import {mapState} from "vuex"
  import Slider from './Slider'

  export default {
    name: "Editor",
    components: {
      Options,
      Slider
    },
    data() {
      return {
        scene: this.$store.state.scene,
        camera: undefined,
        zoom: 50,
        nippleDirection: Optional.empty(),
        joystick: null
      };
    },
    computed: {
      dialog: {
        get() {
          return this.$store.state.chooseFile
        },
        set(val) {
          this.$store.commit('setChooseFile', false)
        }
      },
      ...mapState({
        files: state => state.files
      })
    },
    methods: {
      initNipple() {
        let _this = this;
        this.joystick = nipplejs.create({
          zone: _this.$refs.joystick,
          mode: "static",
          position: {
            left: "100px",
            bottom: "100px"
          },
          size: 100,
          color: "blue"
        });
        this.joystick.on("move", (evt, data) => {
          let alreadyPresent = _this.nippleDirection.isPresent();
          _this.nippleDirection = Optional.ofNullable({
            angle: data.angle.radian,
            intensity: data.distance / 25
          });
          if (!alreadyPresent) {
            _this.applyNippleDirectionOnCamera();
          }
        });
        this.joystick.on("end", () => {
          _this.nippleDirection = Optional.empty();
        });
      },
      applyNippleDirectionOnCamera() {
        this.nippleDirection.ifPresent(data => {
          // Rotate camera
          this.camera.rotation =
              this.camera.rotation -
              Math.cos(data.angle) * Math.min(data.intensity, 1);
          this.camera.angle =
              this.camera.angle -
              Math.sin(data.angle) * Math.min(data.intensity, 1);

          // set timeout in order continue the rotation
          setTimeout(() => {
            this.applyNippleDirectionOnCamera();
          }, 5);
        });
      },
      onZoom(value) {
        this.camera.distance = value
      },
      onClick(event) {
        let x
        let y
        if (event.type === 'tap') {
          x = event.center.x
          y = event.center.y
        } else {
          x = event.clientX
          y = event.clientY
        }
        this.$store.dispatch('deleteCube', {
          rayCasting: this
              .camera
              .rayCasting(
                  (x / this.$refs.canvas.clientWidth) * 2 - 1,
                  (y / this.$refs.canvas.clientHeight) * 2 - 1
              )
        });
      }
    },
    mounted() {
      this.initNipple();

      this.camera = new Three.Camera(this.scene, this.$refs.canvas);
      this.onZoom(this.zoom);
      this.camera.xAngle = 10;

      this.$store.commit('setCam', this.camera)
      this.$store.dispatch('initScene', {
        unitSize: 4,
        x: 5,
        y: 1,
        z: 10
      });
    }
  };
</script>

<style scoped>
  .controls {
    position: absolute;
    top: 0;
  }
</style>
