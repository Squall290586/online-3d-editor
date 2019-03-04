<template>
  <div style="width: 100%; height: 100%; ">
    <options></options>
    <div ref="canvas" style="width: 100%; height: 100%; "></div>
    <div ref="joystick"></div>
    <v-dialog
            v-model="dialog"
            width="500"
    >

    </v-dialog>
  </div>
</template>

<script>
import Options from "./Options";
import * as Three from "@/js/three";
import nipplejs from "nipplejs";
import * as Optional from "optional-js";
import { mapState } from 'vuex'

export default {
  name: "Editor",
  components: {
    Options
  },
  data() {
    return {
      scene: this.$store.state.scene,
      camera: undefined,
      nippleDirection: Optional.empty(),
      joystick: null
    };
  },
  computed: mapState({
    dialog: state => state.chooseFile
  }),
  methods: {
    applyNippleDirectionOnCamera() {
      this.nippleDirection.ifPresent(data => {
        // Rotate camera
        this.camera.rotation =
          this.camera.rotation -
          Math.cos(data.angle) * Math.min(data.intensity, 1);
        this.camera.angle =
          this.camera.angle -
          Math.sin(data.angle) * Math.min(data.intensity, 1);

        // set timeout in order continu the rotation
        setTimeout(() => {
          this.applyNippleDirectionOnCamera();
        }, 5);
      });
    }
  },
  mounted() {
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
    this.joystick.on("end", (evt, data) => {
      _this.nippleDirection = Optional.empty();
    });

    this.camera = new Three.Camera(this.scene, this.$refs.canvas);
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

<style>
</style>
