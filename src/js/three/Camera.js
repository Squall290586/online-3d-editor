import * as Utils from "@/utils";
import * as THREE from "three";
import { Base } from "@/js/three/base/Base";
import { Scene } from "@/js/three/Scene";

// Private
function refresh(camera) {
  camera.renderer.render(camera.scene.scene, camera.camera);
}

// Public
class Camera extends Base {
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

    // Init the 2 parent group for the angle gestion
    let zAngleGroup = new THREE.Group();
    let xAngleGroup = new THREE.Group();
    zAngleGroup.add(xAngleGroup);
    xAngleGroup.add(camera);

    // create a group
    super(zAngleGroup);

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

    // Remake a aspect when the window is resize
    window.addEventListener(
      "resize",
      () => {
        me.camera.aspect = window.innerWidth / window.innerHeight;
        me.camera.updateProjectionMatrix();
        me.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );

    // Set the defaulkt settings
    this.distance = 100;
    this.angle = 10;
    this.rotation = 10;
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
   */
  get camera() {
    return this._camera;
  }

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
    // Get the radian angle
    let radianAngle = this
      .object3d
      .children[0]
      .rotation
      .x;

    // Convert into degrees and return it
    return Math.round(180 * ((Math.PI / 2 - radianAngle) / Math.PI));
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

    // Calcul the radian angle
    let radianAngle = ((-angle / 180) * Math.PI) + Math.PI / 2;

    // Apply the angle on the xAngleGroup object
    this.object3d
      .children[0]
      .rotation
      .x = radianAngle;

    // Fire the events
    this.emit("change", this);
    this.emit("angle", this, this.angle);
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
    // Get the radian angle
    let radianAngle = this.object3d
      .rotation
      .z;

    // Convert into degrees and return it
    return Math.round((radianAngle / Math.PI) * 180);
  }

  set rotation(rotation) {
    // Check the type
    Utils.isNumber(rotation);

    // Apply the range
    while (rotation < 0) {
      rotation = rotation + 360;
    }
    rotation = rotation % 360;

    // Get the radian angle
    let radianAngle = (rotation / 180) * Math.PI;

    // Apply the angle on the zAngleGroup object
    this.object3d
      .rotation
      .z = radianAngle;

    // Fire the events
    this.emit("change", this);
    this.emit("rotation", this, this.rotation);
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
    return this.object3d
      .children[0]
      .children[0]
      .position
      .z;
  }

  set distance(distance) {
    // Check the type
    Utils.isNumber(distance);

    // Apply the distance
    this.object3d
      .children[0]
      .children[0]
      .position
      .z = distance;

    // Fire the events
    this.emit("change", this);
    this.emit("distance", this, this.distance);
  }
}

export { Camera };
