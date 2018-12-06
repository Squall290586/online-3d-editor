import * as THREE from "three";
import { Object } from "@/js/three/base/Object";
import { Line } from "@/js/three/base/Line";
import { Position } from "@/js/three/characteristic/Position";
import * as Colors from "@/js/three/characteristic/Colors";

class Orthonormal extends Object {
  constructor() {
    // create a group
    super(new THREE.Group());

    // Create the 3 axes
    let x1 = new Line(new Position(0, 0, 0), new Position(10000, 0, 0));
    x1.color = Colors.RED;
    let x2 = new Line(new Position(0, 0, 0), new Position(-10000, 0, 0));
    x2.color = Colors.RED;
    x2.isTransparent = true;
    let y1 = new Line(new Position(0, 0, 0), new Position(0, 10000, 0));
    y1.color = Colors.BLUE;
    let y2 = new Line(new Position(0, 0, 0), new Position(0, -10000, 0));
    y2.color = Colors.BLUE;
    y2.isTransparent = true;
    let z1 = new Line(new Position(0, 0, 0), new Position(0, 0, 10000));
    z1.color = Colors.GREEN;
    let z2 = new Line(new Position(0, 0, 0), new Position(0, 0, -10000));
    z2.color = Colors.GREEN;
    z2.isTransparent = true;

    // Add all axes
    this.add(x1);
    this.add(x2);
    this.add(y1);
    this.add(y2);
    this.add(z1);
    this.add(z2);
  }
}

export { Orthonormal };
