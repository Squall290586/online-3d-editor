import Event from "events";
import * as THREE from "three";
import * as Utils from "@/utils";

class Rotation extends Event {
  // Constructor
  constructor(x, y, z) {
    super();
    this.euler = new THREE.Euler();
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  // Method

  // Getters and setters
  get x() {
    return this._x;
  }

  set x(x) {
    Utils.isNumber(x);
    this._x = x;

    // Fire the events
    this.emit("change", this);
    this.emit("x", this, x);
  }

  get y() {
    return this._y;
  }

  set y(y) {
    Utils.isNumber(y);
    this._y = y;

    // Fire the events
    this.emit("change", this);
    this.emit("y", this, y);
  }

  get z() {
    return this._z;
  }

  set z(z) {
    Utils.isNumber(z);
    this._z = z;

    // Fire the events
    this.emit("change", this);
    this.emit("z", this, z);
  }
}

export { Rotation };
