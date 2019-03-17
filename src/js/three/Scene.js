import Event from "events";
import * as THREE from "three";
import * as Utils from "../../utils";
import {Base} from "./base/Base";
import * as Colors from "./characteristic/Colors";

/**
 * This object allow to memorise a objects list
 */
class Scene extends Event {
    _items = [];

    constructor() {
        // Call the super constructor of event
        super();

        // Init the scene
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(Colors.WHITE);
    }

    add(base) {
        // Check the base
        Utils.isInstanceOf(base, Base);

        // Set the scene on the base and add it
        base.scene = this;
        this.scene.add(base.object3d);
        this._items.push(base);

        // Event gestion
        this.emit("change", this);
        this.emit("add", this, base);
        base.on("change", base => this.emit("change", this));
    }

    remove(base) {
        // Check the base
        Utils.isInstanceOf(base, Base);

        // Set the scene on the base and add it
        base.scene = this;
        this.scene.remove(base.object3d);
        this._items = this._items.filter(o => o !== base);

        // Event gestion
        this.emit("change", this);
        this.emit("remove", this, base);
    }

    reset() {
        this.items
            .forEach(o => this.remove(o));
    }

    get scene() {
        return this._scene;
    }

    set scene(scene) {
        Utils.isInstanceOf(scene, Scene);
        this._scene = scene;
    }

    /**
     *
     * @return {Array}
     */
    get items() {
        return this._items.slice(0);
    }
}

export {Scene};
