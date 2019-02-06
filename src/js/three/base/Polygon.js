import * as THREE from "three";
import * as Optional from "optional-js";
import * as Utils from "@/utils";
import * as Colors from "@/js/three/characteristic/Colors";
import { Base } from "@/js/three/base/Base";
import { Curve } from "@/js/three/base/Curve";
import { Vector } from "@/js/three/characteristic/Vector";

class Polygon extends Base {
  // Constructor
  constructor(curve) {
    // Variables
    curve = Optional
      .ofNullable(curve)
      .filter(v => {
        // Check the type
        Utils.isInstanceOf(v, Curve);

        // Check if the curve is a loop
        return v.isLoop && v.isPlan;
      })
      .orElseThrow(() => "You must fill a planed curve with a loop.");

    // Get the normal of the curve
    let normal = curve.normal;
    let normalZ = new Vector(0, 0, 1);

    // Quaternions
    var quaternion = new THREE
      .Quaternion()
      .setFromUnitVectors(normal.vector, normalZ.vector);

    // Create shape and shapeGeometry
    var shape = new THREE.Shape(curve
      .childrens
      .map(line => line.start)
      .map(start => start.vector.applyQuaternion(quaternion)));
    var shapeGeom = new THREE.ShapeGeometry(shape);
    shapeGeom.vertices = curve
      .childrens
      .map(line => line.start.vector);

    // Create the THREE shape
    var shapeMesh = new THREE.Mesh(shapeGeom, new THREE.MeshBasicMaterial({
      color: Colors.BLACK,
      side: THREE.DoubleSide
    }));

    // Create the base
    super(shapeMesh, curve.position);
  }
}

export { Polygon };
