var Scene = require( './Scene' );
var _ = require( 'lodash' );
var THREE = require( 'three' );
// var TweenLite = require( 'TweenLite' );

class BasicScene extends Scene {
	constructor( options ) {
		super( _.merge( {
			camera: {
				fov: 75,
				near: 1,
				far: 10000
			}
		}, options ) );
	}

	setupGeometry( options ) {
		this.geometry.boxgeometry = new THREE.BoxGeometry( 200, 200, 200 );
		return this;
	}

	setupMaterials( options ) {
		this.materials.basicMaterial = new THREE.MeshBasicMaterial( {
			color: 0xff0000,
			wireframe: true
		} );
		return this;
	}

	setupMeshes( options ) {
		this.meshes.cube = new THREE.Mesh( this.geometry.boxgeometry, this.materials.basicMaterial );
		return this;
	}
}

module.exports = BasicScene;
