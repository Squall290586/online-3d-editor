import Event from "events";
import * as THREE from "three";
import * as Optional from "optional-js";
import * as Utils from "@/utils";
import { Position } from "@/js/three/characteristic/Position";
import { Rotation } from "@/js/three/characteristic/Rotation";
import { Scene } from "@/js/three/Scene";

function beforeCalculCenter(object) {
  object
    .childrens
    .forEach(children => {
      children.position = children.position.add(object.position);
    });

  return object;
}

function calculCenter(object) {
  let center = new Position();
  object
    .childrens
    .forEach(children => {
      center = center.add(children.position);
    });
  center = center.divide(object.childrens.length);
  object.position = center;
  object
    .childrens
    .forEach(children => {
      children.position = children.position.sub(object.position);
    });

  // return the object
  return object;
}

class Object extends Event {
  /**
   * 
   * Allow to create a simple object.
   * 
   * @param {THREE.Object3D} object3d The ThreeJS Object3D
   * @param {Position} [position] Position of the object
   * @param {Rotation} [rotation] Rotation of the object
   */
  constructor(object3d, position, rotation) {
    super();
    this.object3d = object3d;
    this.position = Optional
      .ofNullable(position)
      .orElse(new Position());
    this.rotation = Optional
      .ofNullable(rotation)
      .orElse(new Rotation());
    this.childrens = [];
  }

  /**
   * 
   * Add a sub object.
   * 
   * @param {Object} object The adding object
   * 
   */
  add(object) {
    // Check the class
    Utils.isInstanceOf(object, Object);

    // Prerequisites
    beforeCalculCenter(this);

    // Add the object
    this.object3d.add(object.object3d);
    this.childrens.push(object);

    // Calcul the center
    calculCenter(this);

    // Fire the events
    this.emit("change", this);
    this.emit("add", this, object);
  }

  /**
   * 
   * Remove a sub object.
   * 
   * @param {Object} object The removed object
   * 
   */
  remove(object) {
    // Check the class
    Utils.isInstanceOf(object, Object);

    // Prerequisites
    beforeCalculCenter(this);

    // Remove the object
    this.object3d.remove(object.object3d);
    let index = this.childrens.indexOf(object);
    if (index >= 0) {
      this.childrens.splice(index, 1);
    }

    // Calcul the center
    calculCenter(this);

    // Fire the events
    this.emit("change", this);
    this.emit("remove", this, object);
  }

  /**
   * 
   * The position of the object.
   * 
   */
  get position() {
    let vector = this.object3d.position;
    return new Position(vector);
  }

  set position(position) {
    Utils.isInstanceOf(position, Position);
    this.object3d.position.x = position._vector.x;
    this.object3d.position.y = position._vector.y;
    this.object3d.position.z = position._vector.z;

    // Fire the events
    this.emit("change", this);
    this.emit("position-change", this, this.position);
  }

  /**
   * 
   * The THREE.Object3D
   * 
   */
  get object3d() {
    return this._object3d;
  }

  set object3d(object3d) {
    Utils.isInstanceOf(object3d, THREE.Object3D);
    this._object3d = object3d;

    // Fire the events
    this.emit("change", this);
    this.emit("three-js-object-change", this, this.object3d);
  }

  get childrens() {
    return this._childrens;
  }

  set childrens(childrens) {
    this._childrens = childrens;

    // Fire the events
    this.emit("change", this);
    this.emit("childrens-change", this, this.childrens);
  }

  get scene() {
    return this._scene;
  }

  set scene(scene) {
    Utils.isInstanceOf(scene, Scene);
    this._scene = scene;
  }

  get color() {
    return this.object3d.material.color;
  }

  set color(color) {
    Utils.isNumber(color);
    this.object3d.material.color.setHex(color);

    // Fire the events
    this.emit("change", this);
    this.emit("color-change", this, this.color);
  }

  get isTransparent() {
    return this.object3d.material.transparent;
  }

  set isTransparent(isTransparent) {
    this.object3d.material.transparent = isTransparent;
    this.object3d.material.opacity = (isTransparent) ? 0.35 : 1;

    // Fire the events
    this.emit("change", this);
    this.emit("transparant-change", this, this.isTransparent);
  }
}

export { Object };
