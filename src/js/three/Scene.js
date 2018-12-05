import Event from "events";
import * as THREE from "three";
import * as Utils from "@/utils";
import { Object } from "@/js/three/base/Object";

/**
 * This object allow to memorise a objects list
 */
class Scene extends Event {
  constructor() {
    // Call the super constructor of event
    super();

    // Init the scene
    this._scene = new THREE.Scene();
  }

  add(object) {
    // Check the object
    Utils.isInstanceOf(object, Object);

    // Set the scene on the object and add it
    object.scene = this;
    this._scene.add(object.object3d);

    // Event gestion
    this.emit("change", this);
    this.emit("add", this, object);
    object.on("change", object => this.emit("change", this));
  }

  get scene() {
    return this._scene;
  }

  set scene(scene) {
    Utils.isInstanceOf(scene, Scene);
    this._scene = scene;
  }
}

export { Scene };
