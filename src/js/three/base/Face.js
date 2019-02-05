import { Polygon } from "@/js/three/base/Polygon";

class Face extends Polygon {
  // Constructor
  constructor(curve) {
    // Create the base
    super(curve);

    // Get the normal of the curve
    this.add(curve);
  }
}

export { Face };
