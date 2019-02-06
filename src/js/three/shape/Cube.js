import * as THREE from "three";
import { Base } from "@/js/three/base/Base";
import { Line } from "@/js/three/base/Line";
import { Position } from "@/js/three/characteristic/Position";
import { Face } from "@/js/three/base/Face";
import { Curve } from "@/js/three/base/Curve";

class Cube extends Base {
  // Constructor
  constructor(edgeLength, position) {
    // Create faces
    let face1 = new Face(new Curve([new Line(
      new Position(edgeLength / 2, edgeLength / 2, edgeLength / 2),
      new Position(edgeLength / 2, -edgeLength / 2, edgeLength / 2)
    ), new Line(
      new Position(edgeLength / 2, -edgeLength / 2, edgeLength / 2),
      new Position(-edgeLength / 2, -edgeLength / 2, edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, -edgeLength / 2, edgeLength / 2),
      new Position(-edgeLength / 2, edgeLength / 2, edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, edgeLength / 2, edgeLength / 2),
      new Position(edgeLength / 2, edgeLength / 2, edgeLength / 2)
    )]));

    let face2 = new Face(new Curve([new Line(
      new Position(edgeLength / 2, edgeLength / 2, -edgeLength / 2),
      new Position(edgeLength / 2, -edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(edgeLength / 2, -edgeLength / 2, -edgeLength / 2),
      new Position(-edgeLength / 2, -edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, -edgeLength / 2, -edgeLength / 2),
      new Position(-edgeLength / 2, edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, edgeLength / 2, -edgeLength / 2),
      new Position(edgeLength / 2, edgeLength / 2, -edgeLength / 2)
    )]));

    let face3 = new Face(new Curve([new Line(
      new Position(edgeLength / 2, edgeLength / 2, edgeLength / 2),
      new Position(edgeLength / 2, edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(edgeLength / 2, edgeLength / 2, -edgeLength / 2),
      new Position(-edgeLength / 2, edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, edgeLength / 2, -edgeLength / 2),
      new Position(-edgeLength / 2, edgeLength / 2, edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, edgeLength / 2, edgeLength / 2),
      new Position(edgeLength / 2, edgeLength / 2, edgeLength / 2)
    )]));

    let face4 = new Face(new Curve([new Line(
      new Position(edgeLength / 2, -edgeLength / 2, edgeLength / 2),
      new Position(edgeLength / 2, -edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(edgeLength / 2, -edgeLength / 2, -edgeLength / 2),
      new Position(-edgeLength / 2, -edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, -edgeLength / 2, -edgeLength / 2),
      new Position(-edgeLength / 2, -edgeLength / 2, edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, -edgeLength / 2, edgeLength / 2),
      new Position(edgeLength / 2, -edgeLength / 2, edgeLength / 2)
    )]));

    let face5 = new Face(new Curve([new Line(
      new Position(edgeLength / 2, edgeLength / 2, edgeLength / 2),
      new Position(edgeLength / 2, edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(edgeLength / 2, edgeLength / 2, -edgeLength / 2),
      new Position(edgeLength / 2, -edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(edgeLength / 2, -edgeLength / 2, -edgeLength / 2),
      new Position(edgeLength / 2, -edgeLength / 2, edgeLength / 2)
    ), new Line(
      new Position(edgeLength / 2, -edgeLength / 2, edgeLength / 2),
      new Position(edgeLength / 2, edgeLength / 2, edgeLength / 2)
    )]));

    let face6 = new Face(new Curve([new Line(
      new Position(-edgeLength / 2, edgeLength / 2, edgeLength / 2),
      new Position(-edgeLength / 2, edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, edgeLength / 2, -edgeLength / 2),
      new Position(-edgeLength / 2, -edgeLength / 2, -edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, -edgeLength / 2, -edgeLength / 2),
      new Position(-edgeLength / 2, -edgeLength / 2, edgeLength / 2)
    ), new Line(
      new Position(-edgeLength / 2, -edgeLength / 2, edgeLength / 2),
      new Position(-edgeLength / 2, edgeLength / 2, edgeLength / 2)
    )]));

    // create a group
    super(new THREE.Group(), position);

    // Add faces
    this.add(face1);
    this.add(face2);
    this.add(face3);
    this.add(face4);
    this.add(face5);
    this.add(face6);
  }
}

export { Cube };
