import * as Utils from "@/utils";
import { Vector } from "@/js/three/characteristic/Vector";

class Position extends Vector {
  // Methods
  add(vector) {
    Utils.isInstanceOf(vector, Vector);
    return new Position(this.vector.add(vector.vector));
  }

  sub(vector) {
    Utils.isInstanceOf(vector, Vector);
    return new Position(this.vector.sub(vector.vector));
  }

  divide(number) {
    Utils.isNumber(number);
    return new Position(this.vector.divideScalar(number));
  }
}

export { Position };
