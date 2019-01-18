import * as THREE from "three";
import * as Optional from "optional-js";
import * as Utils from "@/utils";
import { Base } from "@/js/three/base/Base";
import { Line } from "@/js/three/base/Line";

function checkLines(curve) {
  let p = curve.position;

  if (curve.childrens.length > 0 && !curve
    .childrens
    .map(line => {
      return (curve.childrens.indexOf(line) === 0) ||
        curve.childrens[curve.childrens.indexOf(line) - 1].end.add(p).equals(line.start.add(p));
    })
    .reduce((one, two) => one ? two : one)) {
    throw new Error("The filled lines aren't correct.");
  }
}

class Curve extends Base {
  // Constructor
  constructor(lines) {
    // Variables
    lines = Optional.ofNullable(lines);

    // Create the base
    super(new THREE.Group());

    // Loop on all lines and check it
    lines.ifPresent(lines => lines.forEach(line => this.add(line)));
  }

  // Methods
  add(line) {
    // Check base
    Utils.isInstanceOf(line, Line);

    // Add the line
    super.add(line);

    // Check the line
    checkLines(this);
  }

  remove(line) {
    // Check base
    Utils.isInstanceOf(line, Line);

    // Add the line
    super.remove(line);

    // Check the line
    checkLines(this);
  }

  // Getters and setters
  get start() {
    return Optional
      .ofNullable(this.childrens[0])
      .map(v => v
        .start
        .add(this.position))
      .orElse(null);
  }

  get end() {
    return Optional
      .ofNullable(this
        .childrens
        .reduce((one, two) => two))
      .map(v => v
        .end
        .add(this.position))
      .orElse(null);
  }

  get isLoop() {
    return Optional
      .ofNullable(this.start)
      .map(start => start.equals(this.end))
      .orElse(false);
  }
}

export { Curve };
