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
		this.geometry.cylindarGeometry = new THREE.CylinderGeometry();
		return this;
	}

	setupMaterials( options ) {
		this.materials.basicMaterial = new THREE.MeshBasicMaterial( {
			color: 0x6699ff,
			wireframe: false
		} );
		return this;
	}

	setupMeshes( options ) {
		this.meshes.cube = new THREE.Mesh( this.geometry.boxgeometry, this.materials.basicMaterial );
		this.meshes.cyl = new THREE.Mesh( this.geometry.cylindarGeometry, this.materials.basicMaterial );
		this.meshes.sph = new THREE.Mesh( this.geometry.sphereGeometry, this.materials.basicMaterial );
		return this;
	}

	setupLights( options ) {
		this.lights.pointLight = new THREE.PointLight( 0xffffff, 5 );
		this.lights.pointLight.position.x = 500;
		this.lights.pointLight.position.y = 250;
		return this;
	}

	layoutScene( options ) {
		this.meshes.cyl.position.x = 300;
		this.meshes.sph.position.x = -300;
		return this;
	}
}

module.exports = FacebookInstallation;
