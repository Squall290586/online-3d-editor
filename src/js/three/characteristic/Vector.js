import * as THREE from "three";
import * as Utils from "@/utils";

class Vector extends Event {
  // Constructor
  constructor(xOrVector, y, z) {
    super();
    xOrVector = xOrVector || 0;
    y = y || 0;
    z = z || 0;
    try {
      Utils.isInstanceOf(xOrVector, THREE.Vector3);
      this.vector = xOrVector;
    } catch (e) {
      Utils.isNumber(xOrVector);
      Utils.isNumber(y);
      Utils.isNumber(z);
      this.vector = new THREE.Vector3(xOrVector || 0, y || 0, z || 0);
    }
  }

  // Method
  add(vector) {
    Utils.isInstanceOf(vector, Vector);
    return new Vector(this.vector.add(vector.vector));
  }

  sub(vector) {
    Utils.isInstanceOf(vector, Vector);
    return new Vector(this.vector.sub(vector.vector));
  }

  divide(number) {
    Utils.isNumber(number);
    return new Vector(this.vector.divideScalar(number));
  }

  multiply(number) {
    return this.divide(1 / number);
  }

  equals(vector) {
    Utils.isInstanceOf(vector, Vector);
    return this.vector.equals(vector.vector);
  }

  // Getters and setters
  get x() {
    return this._vector.x;
  }

  set x(x) {
    Utils.isNumber(x);
    this._vector.x = x;

    // Fire the events
    this.emit("change", this);
    this.emit("x", this, x);
  }

  get y() {
    return this._vector.y;
  }

  set y(y) {
    Utils.isNumber(y);
    this._vector.y = y;

    // Fire the events
    this.emit("change", this);
    this.emit("y", this, y);
  }

  get z() {
    return this._vector.z;
  }

  set z(z) {
    Utils.isNumber(z);
    this._vector.z = z;

    // Fire the events
    this.emit("change", this);
    this.emit("z", this, z);
  }

  get vector() {
    return this._vector.clone();
  }

  set vector(vector) {
    Utils.isInstanceOf(vector, THREE.Vector3);
    this._vector = vector;

    // Fire the events
    this.emit("change", this);
    this.emit("vector", this, vector);
  }
}

export { Vector };
