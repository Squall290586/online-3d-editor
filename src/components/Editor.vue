<template>
  <div style="width: 100%; height: 100%; ">
    <options></options>
    <div ref="canvas" style="width: 100%; height: 100%; "></div>
    <div ref="joystick"></div>
  </div>
</template>

<script>
import Options from "./Options";
import * as Three from "@/js/three";
import nipplejs from "nipplejs";
import * as Optional from "optional-js";

export default {
  name: "Editor",
  components: {
    Options
  },
  data: function() {
    return {
      scene: null,
      camera: null,
      nippleDirecion: Optional.empty(),
      joystick: null
    };
  },
  methods: {
    applyNippleDirectionOnCamera: function() {
      this.nippleDirecion.ifPresent(data => {
        // Rotate camera
        this.camera.rotation =
          this.camera.rotation +
          Math.cos(data.angle) * Math.min(data.intensity, 1);
        this.camera.angle =
          this.camera.angle -
          Math.sin(data.angle) * Math.min(data.intensity, 1);

        // set timeout in order continu the rotation
        setTimeout(() => {
          this.applyNippleDirectionOnCamera();
        }, 5);
      });
    },
    initScene: function(unitSize, unitSizeNumber) {
      let size = unitSize * unitSizeNumber;
      let count = 0;

      for (let i = 0; i < unitSizeNumber; i++) {
        for (let j = 0; j < unitSizeNumber; j++) {
          for (let k = 0; k < unitSizeNumber; k++) {
            let x = -size / 2 + i * unitSize + unitSize / 2;
            let y = -size / 2 + j * unitSize + unitSize / 2;
            let z = -size / 2 + k * unitSize + unitSize / 2;

            console.log(count++);
            this.scene.add(
              new Three.shape.Cube(
                unitSize,
                new Three.characteristic.Position(x, y, z)
              )
            );
          }
        }
      }
    }
  },
  mounted: function() {
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
      let alreadyPresent = this.nippleDirecion.isPresent();
      this.nippleDirecion = Optional.ofNullable({
        angle: data.angle.radian,
        intensity: data.distance / 25
      });
      if (!alreadyPresent) {
        this.applyNippleDirectionOnCamera();
      }
    });
    this.joystick.on("end", (evt, data) => {
      this.nippleDirecion = Optional.empty();
    });

    this.scene = new Three.Scene();
    this.camera = new Three.Camera(this.scene, this.$refs.canvas);

    this.camera.xAngle = 10;
    this.scene.add(this.camera);
    this.initScene(4, 5);
  }
};
</script>

<style>
</style>
