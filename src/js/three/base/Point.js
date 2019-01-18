import * as THREE from "three";
import * as Utils from "@/utils";
import { Base } from "@/js/three/base/Base";
import * as Colors from "@/js/three/characteristic/Colors";

class Point extends Base {
  // Constructor
  constructor(center) {
    // Private method
    function getPointSize() {
      let result = document.body.clientWidth;
      if (result < document.body.clientHeight) {
        result = document.body.clientHeight;
      }
      return result * 0.005;
    }

    // Create the geometry
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3());

    // Create the material
    let material = new THREE.PointsMaterial({
      color: Colors.RED,
      size: getPointSize(),
      sizeAttenuation: false
    });

    // Listen each window resize
    window.addEventListener("resize", () => {
      material.size = getPointSize();
    }, false);

    // Create the base
    super(new THREE.Points(geometry, material), center);
  }

  // Getter and setters
  get ratio() {
    return this._screenRatio;
  }

  set ratio(screenRatio) {
    Utils.isNumber(screenRatio);
    this._screenRatio = screenRatio;

    // Fire the events
    this.emit("change", this);
    this.emit("ratio-change", this, this.isTransparent);
  }
}

export { Point };
