import * as THREE from "three";
import * as Colors from "../characteristic/Colors";
import {Base} from "../base/Base";

class Cube extends Base {
    // Attributs
    _size;

    // Constructor
    constructor(size, position) {
        // Create the cube
        let geometry = new THREE.BoxGeometry(size, size, size);
        let material = new THREE.MeshBasicMaterial({
            color: Colors.RED
        });
        let cube = new THREE.Mesh(geometry, material);

        // Create edges
        let geo = new THREE.EdgesGeometry(geometry);
        let mat = new THREE.LineBasicMaterial({
            color: Colors.BLACK,
            linewidth: 1
        });
        let wireframe = new THREE.LineSegments(geo, mat);

        // make sure wireframes are rendered 2nd
        wireframe.renderOrder = 1;
        cube.add(wireframe);

        // Call super
        super(cube, position);

        // set attributs
        this._size = size;
    }

    clone() {
        return new Cube(this.size, this.position);
    }

    get isSelected() {
        return super.isSelected;
    }

    set isSelected(isSelected) {
        super.isSelected = isSelected;
        this.color = (isSelected) ? Colors.YELLOW : Colors.RED;
    }

    get size() {
        return this._size;
    }
}

export {Cube};
