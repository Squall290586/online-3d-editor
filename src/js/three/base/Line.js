import * as THREE from "three";
import * as Utils from "@/utils";
import { Object } from "@/js/three/base/Object";
import { Position } from "@/js/three/characteristic/Position";
import * as Colors from "@/js/three/characteristic/Colors";

class Line extends Object {
  // Constructor
  constructor(start, end) {
    // Check arguments
    Utils.isInstanceOf(start, Position);
    Utils.isInstanceOf(end, Position);

    // Calcul of the center and of the true vector
    let position = new Position(start.vector.add(end.vector).divideScalar(2));

    // Create the geometry
    let geometry = new THREE.Geometry();
    geometry.vertices.push(
      start.vector.sub(position.vector),
      end.vector.sub(position.vector)
    );

    // Create the material
    let material = new THREE.LineBasicMaterial({
      color: Colors.GRAY
    });

    // Create the object
    super(new THREE.Line(geometry, material), position);
  }

  // Methods
  setPositions(start, end) {
    Utils.isInstanceOf(start, Position);
    Utils.isInstanceOf(end, Position);

    // Calcul of the center and of the true vector
    let position = new Position(start.vector.add(end.vector).divideScalar(2));

    // Set Three Js attributes
    this.object3d.geometry.vertices[0] = start.vector.sub(position.vector);
    this.object3d.geometry.vertices[1] = end.vector.sub(position.vector);
    this.position = position;
  }

  // Getters and setters
  get start() {
    return new Position(this.position.vector.add(this.object3d.geometry.vertices[0]));
  }

  set start(start) {
    Utils.isInstanceOf(start, Position);
    this.setPositions(start, this.end);

    // Fire the events
    this.emit("change", this);
    this.emit("start-change", this, this.start);
  }

  get end() {
    return new Position(this.position.vector.add(this.object3d.geometry.vertices[1]));
  }

  set end(end) {
    Utils.isInstanceOf(end, Position);
    this.setPositions(end, this.end);

    // Fire the events
    this.emit("change", this);
    this.emit("end-change", this, this.end);
  }
}

export { Line };
