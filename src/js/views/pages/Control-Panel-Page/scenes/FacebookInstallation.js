var PostProcessedScene = require( './PostProcessedScene' );
var _ = require( 'lodash' );
var THREE = require( 'three' );
var $ = require( 'jquery' );
// var TweenLite = require( 'TweenLite' );

class FacebookInstallation extends PostProcessedScene {
	constructor( options ) {
		super( _.merge( {
			camera: {
				fov: 75,
				near: 1,
				far: 10000,
				position: new THREE.Vector3( 0, 500, -1000 )
			}
		}, options ) );
	}

	update( data ) {}

	loadAssets() {
		var deferred = $.Deferred();
		// load stuff in here
		// resolve the deferred when load is complete
		deferred.notify( 1 );
		deferred.resolve();
		return deferred.promise();
	};

	// setup elements

	setupRenderChain( options ) {
		super.setupRenderChain( options );
		this.renderPass.renderToScreen = true;
		return this;
	}

	setupShaders( options ) {
		return this;
	}

	setupGeometry( options ) {
		this.geometry.boxgeometry = new THREE.BoxGeometry( 200, 200, 200 );
		this.geometry.sphereGeometry = new THREE.SphereGeometry();
		this.cylindarGeometry = new THREE.CylindarGeometry();
		return this;
	}

	setupMaterials( options ) {
		this.materials.basicMaterial = new THREE.MeshBasicMaterial( {
			color: 0x6699ff,
			wireframe: true
		} );
		return this;
	}

	setupMeshes( options ) {
		this.meshes.cube = new THREE.Mesh( this.geometry.boxgeometry, this.materials.basicMaterial );
		return this;
	}

	setupLights( options ) {
		return this;
	}

	layoutScene( options ) {
		return this;
	}
}

module.exports = FacebookInstallation;
