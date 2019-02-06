<template>
  <div style="width: 100%; height: 100%; ">
    <main-menu></main-menu>
    <options></options>
    <div ref="canvas" style="width: 100%; height: 100%; "></div>
  </div>
</template>

<script>
import MainMenu from "./MainMenu";
import Options from "./Options";
import * as Three from "@/js/three";

export default {
  name: "Editor",
  components: {
    MainMenu,
    Options
  },
  data: function() {
    return {
      scene: null,
      camera: null
    };
  },
  mounted: function() {
    this.scene = new Three.Scene();
    this.camera = new Three.Camera(this.scene, this.$refs.canvas);


    let orthonormal = new Three.Orthonormal();

    this.camera.xAngle = 10;


    ;

    this.scene.add(this.camera);
    this.scene.add(new Three.shape.Cube(10));
    this.scene.add(orthonormal);
    window.camera = this.camera;
  }
};
</script>

<style>
</style>
