import * as THREE from "three";
import * as Colors from "@/js/three/characteristic/Colors";
import { Base } from "@/js/three/base/Base";

class Cube extends Base {
  // Constructor
  constructor(size, position) {
    // Create the cube
    var geometry = new THREE.BoxGeometry(size, size, size);
    var material = new THREE.MeshBasicMaterial({
      color: Colors.RED
    });
    var cube = new THREE.Mesh(geometry, material);

    // Create edges
    var geo = new THREE.EdgesGeometry(geometry);
    var mat = new THREE.LineBasicMaterial({
      color: Colors.BLACK, 
      linewidth: 1
    });
    var wireframe = new THREE.LineSegments(geo, mat);

    // make sure wireframes are rendered 2nd
    wireframe.renderOrder = 1; 
    cube.add(wireframe);

    // Call super
    super(cube, position);
  }
}

export { Cube };
