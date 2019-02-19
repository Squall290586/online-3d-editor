import * as THREE from "three";
import * as Colors from "@/js/three/characteristic/Colors";
import { Base } from "@/js/three/base/Base";

class Cube extends Base {
  // Constructor
  constructor(size, position) {
    var geometry = new THREE.BoxGeometry(size, size, size);
    var material = new THREE.MeshBasicMaterial({
      color: Colors.RED
    });
    var cube = new THREE.Mesh(geometry, material);

    super(cube, position);
  }
}

export { Cube };
