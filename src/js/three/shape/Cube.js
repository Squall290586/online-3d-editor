import * as THREE from "three";
import * as Colors from "../characteristic/Colors";
import {Base} from "../base/Base";

class Cube extends Base {
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
    }

    set isSelected(isSelected) {
        super.isSelected = isSelected;
        this.color = (isSelected) ? Colors.YELLOW : Colors.RED;
    }

    get isSelected() {
        return super.isSelected;
    }
}

export {Cube};
