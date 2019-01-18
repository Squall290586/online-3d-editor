<template>
  <div>
    <main-menu></main-menu>
  </div>
</template>

<script>
import MainMenu from "./MainMenu";
import * as Three from "@/js/three";

export default {
  name: "Editor",
  components: {
    MainMenu
  },
  data: function() {
    return {
      scene: null,
      camera: null
    };
  },
  mounted: function() {
    this.scene = new Three.Scene();
    this.camera = new Three.Camera(this.scene, this.$el);

    let pp = new Three.base.Point(new Three.characteristic.Position(20, 0, 0));
    let line1 = new Three.base.Line(
      new Three.characteristic.Position(20, 0, 0),
      new Three.characteristic.Position(20, 20, 20)
    );
    let line2 = new Three.base.Line(
      new Three.characteristic.Position(20, 20, 20),
      new Three.characteristic.Position(30, 30, 30)
    );
    let line3 = new Three.base.Line(
      new Three.characteristic.Position(30, 30, 30),
      new Three.characteristic.Position(20, 45, 40)
    );
    let line4 = new Three.base.Line(
      new Three.characteristic.Position(20, 45, 40),
      new Three.characteristic.Position(20, 0, 0)
    );
    let curve = new Three.base.Curve([line1, line2, line3, line4]);
    let orthonormal = new Three.Orthonormal();

    this.camera.xAngle = 10;

    this.scene.add(this.camera);
    this.scene.add(pp);
    this.scene.add(curve);
    this.scene.add(orthonormal);
    pp.color = 0x1111ff;
    window.camera = this.camera;
    window.curve = curve;
    window.line3 = line3;
  }
};
</script>

<style scoped>
</style>
