import Event from "events";
import * as THREE from "three";
import * as Optional from "optional-js";
import * as Utils from "../../../utils";
import {Position} from "../characteristic/Position";
import {Scene} from "../Scene";

function beforeCalculCenter(base) {
    base
        .childrens
        .forEach(children => {
            children.position = children.position.add(base.position);
        });

    return base;
}

function calculCenter(base) {
    let center = new Position();
    base
        .childrens
        .forEach(children => {
            center = center.add(children.position);
        });
    center = center.divide(base.childrens.length);
    base.position = center;
    base
        .childrens
        .forEach(children => {
            children.position = children.position.sub(base.position);
        });

    // return the base
    return base;
}

class Base extends Event {
    /**
     * @type {boolean}
     * @private
     */
    _isSelected = false;

    /**
     *
     * Allow to create a simple base.
     *
     * @param {THREE.Object3D} object3d The ThreeJS Object3D
     * @param {Position} [position] Position of the base
     */
    constructor(object3d, position) {
        super();
        this.object3d = object3d;
        this.position = Optional
            .ofNullable(position)
            .orElse(new Position());
        this.childrens = [];
    }

    /**
     *
     * Add a sub base.
     *
     * @param {Base} base The adding base
     *
     */
    add(base) {
        // Check the class
        Utils.isInstanceOf(base, Base);

        // Prerequisites
        beforeCalculCenter(this);

        // Add the base
        this.object3d.add(base.object3d);
        this.childrens.push(base);

        // Calcul the center
        calculCenter(this);

        // Fire the events
        this.emit("change", this);
        this.emit("add", this, base);
    }

    /**
     *
     * Remove a sub base.
     *
     * @param {Base} base The removed base
     *
     */
    remove(base) {
        // Check the class
        Utils.isInstanceOf(base, Base);

        // Prerequisites
        beforeCalculCenter(this);

        // Remove the base
        this.object3d.remove(base.object3d);
        let index = this.childrens.indexOf(base);
        if (index >= 0) {
            this.childrens.splice(index, 1);
        }

        // Calcul the center
        calculCenter(this);

        // Fire the events
        this.emit("change", this);
        this.emit("remove", this, base);
    }

    /**
     * Toggle the selection
     */
    toggle() {
        this.isSelected = !this.isSelected;
    }

    /**
     * Clone this Object
     *
     * @return {Base}
     */
    clone() {
        return new Base(this.object3d.clone(), this.position);
    }

    /**
     *
     * The position of the base.
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
     * @return THREE.Object3D
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
        this.object3d.material.opacity = isTransparent ? 0.35 : 1;

        // Fire the events
        this.emit("change", this);
        this.emit("transparant-change", this, this.isTransparent);
    }

    /**
     * @return {boolean}
     */
    get isSelected() {
        return this._isSelected;
    }

    set isSelected(isSelected) {
        this._isSelected = isSelected;
    }
}

export {Base};
