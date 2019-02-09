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

export default {
  name: "Editor",
  components: {
    Options
  },
  data: function() {
    return {
      scene: null,
      camera: null,
      joystick: null
    };
  },
  mounted: function() {
    let _this = this;
    this.joystick = nipplejs.create({
      zone: _this.$refs.joystick,
      mode: 'static',
      position: {
        left: '100px',
        bottom: '100px'
      },
      size: 100,
      color: 'blue'
    })
    this.joystick.on('move', function(evt, data) {
      _this.camera.rotation = _this.camera.rotation + Math.cos(data.angle.radian) * Math.min(data.force * data.distance, 1)
      _this.camera.angle = _this.camera.angle - Math.sin(data.angle.radian) * Math.min(data.force * data.distance, 1)
    })

    this.scene = new Three.Scene();
    this.camera = new Three.Camera(this.scene, this.$refs.canvas);

    let orthonormal = new Three.Orthonormal();

    this.camera.xAngle = 10;

    this.scene.add(this.camera);
    this.scene.add(new Three.shape.Cube(10));
    this.scene.add(orthonormal);
  }
};
</script>

<style>
</style>
