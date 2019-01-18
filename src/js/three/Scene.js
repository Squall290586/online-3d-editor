import Event from "events";
import * as THREE from "three";
import * as Utils from "@/utils";
import { Base } from "@/js/three/base/Base";

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

  add(base) {
    // Check the base
    Utils.isInstanceOf(base, Base);

    // Set the scene on the base and add it
    base.scene = this;
    this._scene.add(base.object3d);

    // Event gestion
    this.emit("change", this);
    this.emit("add", this, base);
    base.on("change", base => this.emit("change", this));
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
