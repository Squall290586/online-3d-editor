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

    let pp = new Three.base.Point(new Three.characteristic.Position(20, 0, 0));
    let line1 = new Three.base.Line(
      new Three.characteristic.Position(20, 0, 0),
      new Three.characteristic.Position(20, 20, 0)
    );
    let line2 = new Three.base.Line(
      new Three.characteristic.Position(20, 20, 0),
      new Three.characteristic.Position(0, 20, 0)
    );
    let line3 = new Three.base.Line(
      new Three.characteristic.Position(0, 20, 0),
      new Three.characteristic.Position(0, 0, 0)
    );
    let line4 = new Three.base.Line(
      new Three.characteristic.Position(0, 0, 0),
      new Three.characteristic.Position(20, 0, 0)
    );
    let curve = new Three.base.Face(new Three.base.Curve([line1, line2, line3, line4]));
    let line11 = new Three.base.Line(
      new Three.characteristic.Position(20, 0, 20),
      new Three.characteristic.Position(20, 20, 20)
    );
    let line12 = new Three.base.Line(
      new Three.characteristic.Position(20, 20, 20),
      new Three.characteristic.Position(0, 20, 20)
    );
    let line13 = new Three.base.Line(
      new Three.characteristic.Position(0, 20, 20),
      new Three.characteristic.Position(0, 0, 20)
    );
    let line14 = new Three.base.Line(
      new Three.characteristic.Position(0, 0, 20),
      new Three.characteristic.Position(20, 0, 20)
    );
    let curve1 = new Three.base.Face(new Three.base.Curve([line11, line12, line13, line14]));
    let orthonormal = new Three.Orthonormal();

    this.camera.xAngle = 10;

    this.scene.add(this.camera);
    this.scene.add(pp);
    this.scene.add(curve);
    this.scene.add(curve1);
    this.scene.add(orthonormal);
    pp.color = 0x1111ff;
    window.camera = this.camera;
    window.curve = curve;
    window.line3 = line3;
  }
};
</script>

<style>
</style>
