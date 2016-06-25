var Scene = require( './Scene' );
var _ = require( 'lodash' );
var THREE = require( 'three' );
var TweenMax = require( 'TweenMax' );

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

	setupScene( options ) {
		this.scene = new THREE.Scene();
		_.each( this.meshes, ( m ) => this.scene.add( m ) );
		_.each( this.lights, ( l ) => this.scene.add( l ) );
		return this;
	}

	setupCamera( options ) {
		this.camera = new THREE.PerspectiveCamera(
			options.camera.fov,
			options.el.innerWidth / options.el.innerHeight,
			options.camera.near,
			options.camera.far );
		this.camera.position.z = 1000;
		return this;
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

	onResize() {
		super.onResize();
	}
}

module.exports = BasicScene;
