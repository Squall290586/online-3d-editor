import * as Utils from "../../utils";
import * as THREE from "three";
import {Position} from "./characteristic/Position";
import {Base} from "./base/Base";
import {Scene} from "./Scene";

// Private
function refresh(camera) {
    camera.renderer.render(camera.scene.scene, camera.camera);
}

function toRadian(value) {
    return value / 180 * Math.PI;
}

// Public
class Camera extends Base {
    _angle;
    _rotation;
    _distance;

    // Constructor
    constructor(scene, domTarget) {
        // Init the camera
        let camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        // Init the renderer canvas
        let renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(domTarget.clientWidth, domTarget.clientHeight);
        domTarget.appendChild(renderer.domElement);

        // create a group
        super(camera);

        // Set attributes
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        // Launch a render on each animation request
        let me = this;
        scene.on("change", scene => {
            requestAnimationFrame(() => {
                refresh(me);
            });
        });
        window.camera = this;
        // Remake a aspect when the window is resize
        window.addEventListener(
            "resize",
            () => {
                me.camera.aspect = window.innerWidth / window.innerHeight;
                me.camera.updateProjectionMatrix();
                me.renderer.setSize(window.innerWidth, window.innerHeight);

                // Fire the events
                me.emit("change", this);
            },
            false
        );

        // Apply a position on any change on position, rotation, angle
        this.on("change", camera => {
            camera.applyRotation();
        });

        // Set the default settings
        this.distance = 100;
        this.angle = 10;
        this.rotation = 10;
    }

    applyRotation() {
        if (this.camera) {
            this.camera.position.z = Math.sin(toRadian(this.angle)) * this.distance + this.position.z;
            console.log(this.camera.position.z);
            this.camera.position.y = Math.cos(toRadian(this.angle)) * Math.sin(toRadian(this.rotation)) * this.distance + this.position.y
            console.log(this.camera.position.y);
            this.camera.position.x = Math.cos(toRadian(this.angle)) * Math.cos(toRadian(this.rotation)) * this.distance + this.position.x
            console.log(this.camera.position.x);
            this.camera.lookAt(this.position.vector);


            console.log(this.position.sub(new Position(this.camera.position.x, this.camera.position.y, this.camera.position.z)).vector)

            this.camera.rotateOnAxis(
                this.position.sub(new Position(this.camera.position.x, this.camera.position.y, this.camera.position.z)).vector,
                0.1
            )
        }
    }

    /**
     * The threeJS scene
     */
    get scene() {
        return this._scene;
    }

    set scene(scene) {
        Utils.isInstanceOf(scene, Scene);
        this._scene = scene;
    }

    /**
     * The threeJS camera
     *
     * @return {THREE.Camera}
     */
    get camera() {
        return this._camera;
    }

    /**
     * The threeJS camera
     *
     * @param {THREE.Camera} camera
     */
    set camera(camera) {
        Utils.isInstanceOf(camera, THREE.Camera);
        this._camera = camera;
    }

    /**
     * The threeJS renderer
     */
    get renderer() {
        return this._renderer;
    }

    set renderer(renderer) {
        Utils.isInstanceOf(renderer, THREE.WebGLRenderer);
        this._renderer = renderer;
    }

    /**
     *
     * The position of the base.
     *
     * @return {Position} the position of the object.
     *
     */
    get position() {
        return new Position(this._position.vector);
    }

    set position(position) {
        // Check the position type
        Utils.isInstanceOf(position, Position);

        // Set the internal attribut
        this._position = position;

        // Fire the events
        this.emit("change", this);
        this.emit("position-change", this, this.position);
    }

    /**
     *
     * The angle of the camera.
     *
     * It allow to up or down the camera view.
     *
     * It's a number that represents the angle with horizontal plan.
     * The angle is expressed in degrees.
     * The range is [90, -90].
     *
     * @throws An exception if the setted value isn't a number.
     */
    get angle() {
        return this._angle;
        /*// Get the radian angle
        let radianAngle = this
          .object3d
          .children[0]
          .rotation
          .x;

        // Convert into degrees and return it
        return 180 * ((Math.PI / 2 - radianAngle) / Math.PI);*/
    }

    set angle(angle) {
        // Check the type
        Utils.isNumber(angle);

        // Apply the range
        if (angle < -90) {
            angle = -90;
        }
        if (angle > 90) {
            angle = 90;
        }

        this._angle = angle;

        // Fire the events
        this.emit("change", this);
        this.emit("angle-change", this, this.angle);
    }

    /**
     *
     * The rotation of the camera.
     *
     * It allow to rotate the camera view.
     *
     * It's a number that represents the rotation with Z index.
     * The angle is expressed in degrees.
     * The range is [0, 359].
     *
     * @throws An exception if the setted value isn't a number.
     */
    get rotation() {
        return this._rotation;
        /*/ Get the radian angle
        let radianAngle = this.object3d
            .rotation
            .z;

        // Convert into degrees and return it
        return (radianAngle / Math.PI) * 180;*/
    }

    set rotation(rotation) {
        // Check the type
        Utils.isNumber(rotation);

        // Apply the range
        while (rotation < 0) {
            rotation = rotation + 360;
        }
        rotation = rotation % 360;

        this._rotation = rotation;
        // Fire the events
        this.emit("change", this);
        this.emit("rotation-change", this, this.rotation);
        // Get the radian angle
        /*let radianAngle = (rotation / 180) * Math.PI;

        // Apply the angle on the zAngleGroup object
        this.object3d
            .rotation
            .z = radianAngle;

        // Fire the events
        this.emit("change", this);
        this.emit("rotation", this, this.rotation);*/
    }

    /**
     *
     * The distance of the camera.
     *
     * It allow to remote the camera view.
     *
     * It's a number that represents the distance.
     *
     * @throws An exception if the setted value isn't a number.
     */
    get distance() {
        return this._distance;
    }

    set distance(distance) {
        // Check the type
        Utils.isNumber(distance);

        // Apply the distance
        this._distance = distance;
    }
}

export {
    Camera
};
