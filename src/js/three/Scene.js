import Event from "events";
import * as THREE from "three";
import * as Utils from "../../utils";
import {Base} from "./base/Base";
import * as Colors from "./characteristic/Colors";

class STLExporter {
    constructor() {}

    parse() {

        let vector = new THREE.Vector3();
        let normalMatrixWorld = new THREE.Matrix3();

        return function parse( scene, options ) {

            if ( options === undefined ) options = {};

            let binary = options.binary !== undefined ? options.binary : false;

            //

            let objects = [];
            let triangles = 0;

            scene.traverse( function ( object ) {

                if ( object.isMesh ) {

                    let geometry = object.geometry;

                    if ( geometry.isBufferGeometry ) {

                        geometry = new THREE.Geometry().fromBufferGeometry( geometry );

                    }

                    if ( geometry.isGeometry ) {

                        triangles += geometry.faces.length;

                        objects.push( {

                            geometry: geometry,
                            matrixWorld: object.matrixWorld

                        } );

                    }

                }

            } );

            if ( binary ) {

                let offset = 80; // skip header
                let bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
                let arrayBuffer = new ArrayBuffer( bufferLength );
                let output = new DataView( arrayBuffer );
                output.setUint32( offset, triangles, true ); offset += 4;

                for ( let i = 0, il = objects.length; i < il; i ++ ) {

                    let object = objects[ i ];

                    let vertices = object.geometry.vertices;
                    let faces = object.geometry.faces;
                    let matrixWorld = object.matrixWorld;

                    normalMatrixWorld.getNormalMatrix( matrixWorld );

                    for ( let j = 0, jl = faces.length; j < jl; j ++ ) {

                        let face = faces[ j ];

                        vector.copy( face.normal ).applyMatrix3( normalMatrixWorld ).normalize();

                        output.setFloat32( offset, vector.x, true ); offset += 4; // normal
                        output.setFloat32( offset, vector.y, true ); offset += 4;
                        output.setFloat32( offset, vector.z, true ); offset += 4;

                        let indices = [ face.a, face.b, face.c ];

                        for ( let k = 0; k < 3; k ++ ) {

                            vector.copy( vertices[ indices[ k ] ] ).applyMatrix4( matrixWorld );

                            output.setFloat32( offset, vector.x, true ); offset += 4; // vertices
                            output.setFloat32( offset, vector.y, true ); offset += 4;
                            output.setFloat32( offset, vector.z, true ); offset += 4;

                        }

                        output.setUint16( offset, 0, true ); offset += 2; // attribute byte count

                    }

                }

                return output;

            } else {

                let output = '';

                output += 'solid exported\n';

                for ( let i = 0, il = objects.length; i < il; i ++ ) {

                    let object = objects[ i ];

                    let vertices = object.geometry.vertices;
                    let faces = object.geometry.faces;
                    let matrixWorld = object.matrixWorld;

                    normalMatrixWorld.getNormalMatrix( matrixWorld );

                    for ( let j = 0, jl = faces.length; j < jl; j ++ ) {

                        let face = faces[ j ];

                        vector.copy( face.normal ).applyMatrix3( normalMatrixWorld ).normalize();

                        output += '\tfacet normal ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
                        output += '\t\touter loop\n';

                        let indices = [ face.a, face.b, face.c ];

                        for ( let k = 0; k < 3; k ++ ) {

                            vector.copy( vertices[ indices[ k ] ] ).applyMatrix4( matrixWorld );

                            output += '\t\t\tvertex ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';

                        }

                        output += '\t\tendloop\n';
                        output += '\tendfacet\n';

                    }

                }

                output += 'endsolid exported\n';

                return output;

            }

        };

    }
}

/**
 * This object allow to memorise a objects list
 */
class Scene extends Event {
    _items = [];

    constructor() {
        // Call the super constructor of event
        super();
        // Init the scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(Colors.WHITE);
    }

    add(base) {
        // Check the base
        Utils.isInstanceOf(base, Base);

        // Set the scene on the base and add it
        base.scene = this;
        this.scene.add(base.object3d);
        this._items.push(base);

        // Event gestion
        this.emit("change", this);
        this.emit("add", this, base);
        base.on("change", base => this.emit("change", this));
    }

    remove(base) {
        // Check the base
        Utils.isInstanceOf(base, Base);

        // Set the scene on the base and add it
        base.scene = this;
        this.scene.remove(base.object3d);
        this._items = this._items.filter(o => o !== base);

        // Event gestion
        this.emit("change", this);
        this.emit("remove", this, base);
    }

    reset() {
        this.items
            .forEach(o => {
                if (o.camera !== window.camera) this.remove(o)
            });
    }

    export() {
        let exporter = new STLExporter();
        let dataView = exporter.parse(this.scene, {binary: true});
        return new Promise((resolve) => resolve(new Blob([dataView], {type: "application/sla"})));
    }

    /**
     *
     * @return {THREE.Scene}
     */
    get scene() {
        return this._scene;
    }

    set scene(scene) {
        Utils.isInstanceOf(scene, THREE.Scene);
        this._scene = scene;
    }

    /**
     *
     * @return {Array}
     */
    get items() {
        return this._items.slice(0);
    }
}

export {Scene};
