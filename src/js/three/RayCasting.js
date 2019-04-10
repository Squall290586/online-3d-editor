import {Base} from "./base/Base";
import {Vector} from "./characteristic/Vector";

// Public
class RayCasting {
    _object;
    _direction;

    /**
     *
     * @param object Base
     * @param direction Vector
     */
    constructor(object, direction) {
        this.object = object;
        this.direction = direction;
    }

    /**
     * @return Base
     */
    get object() {
        return this._object;
    }

    set object(object) {
        this._object = object;
    }

    /**
     * @return Vector
     */
    get direction() {
        return this._direction;
    }

    set direction(direction) {
        this._direction = direction;
    }
}

export {RayCasting};
