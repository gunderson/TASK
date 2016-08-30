var PostProcessedScene = require( '_TASK/views/Three-View/scenes/PostProcessedScene' );
var _ = require( 'lodash' );
var THREE = require( 'three' );
var $ = require( 'jquery' );
// var TweenLite = require( 'TweenLite' );
var BranchPass = require( 'postprocessing' )
	.BranchPass;
var MergePass = require( 'postprocessing' )
	.MergePass;
var ColorizePass = require( '../passes/ColorizePass' );
var HorizontalBlurPass = require( '../passes/HorizontalBlurPass' );

class FacebookInstallation extends PostProcessedScene {
	constructor( options ) {
		super( _.mergeWith( {
			// ---------------------------------------------------
			// Local Properties

			camera: {
				fov: 75,
				near: 1,
				far: 10000,
				position: new THREE.Vector3( 100, 500, -700 )
			}
		}, options, PostProcessedScene.mergeRules ) );
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
		this.postProcessingPasses.renderPass.renderToScreen = false;
		let passes = {
			// HorizontalBlurPass: new HorizontalBlurPass( {
			// 	renderToScreen: true
			// } ),
			MakePink: new ColorizePass( {
				color: new THREE.Color( 0xff00ff ),
				renderToScreen: true
			} )
		};
		_.extend( this.postProcessingPasses, passes );

		// this.composer.branch( {
		// 	name: 'branch',
		// 	renderer: new THREE.WebGLRenderTarget( 1, 1, {
		// 		minFilter: THREE.LinearFilter,
		// 		magFilter: THREE.LinearFilter,
		// 		generateMipmaps: false
		// 	} )
		// } );
		this.composer
			// 	// 	.addPass( passes.HorizontalBlurPass )
			.addPass( passes.MakePink )
			// 	.merge( 'branch', 'main', null, {
			// 		renderToScreen: true
			// 	} );
		return this;
	}

	setupShaders( options ) {
		return this;
	}

	setupGeometry( options ) {
		_.extend( this.geometry, {
			boxgeometry: new THREE.BoxGeometry( 200, 200, 200 ),
			sphereGeometry: new THREE.SphereGeometry(),
			cylindarGeometry: new THREE.CylinderGeometry(),
			planeGeometry: new THREE.PlaneGeometry( 1500, 1500 )
		} );
		return this;
	}

	setupMaterials( options ) {
		this.materials.basicMaterial = new THREE.MeshLambertMaterial( {
			color: 0x6699ff
		} );
		return this;
	}

	setupMeshes( options ) {
		_.extend( this.meshes, {
			cube: new THREE.Mesh( this.geometry.boxgeometry, this.materials.basicMaterial ),
			cyl: new THREE.Mesh( this.geometry.cylindarGeometry, this.materials.basicMaterial ),
			sph: new THREE.Mesh( this.geometry.sphereGeometry, this.materials.basicMaterial ),
			groundPlane: new THREE.Mesh( this.geometry.planeGeometry, this.materials.basicMaterial )
		} );

		// ---------------------------------------------------
		// Shadows

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.BasicShadowMap;

		_( this.meshes )
			.each( ( mesh ) => {
				mesh.receiveShadow = true;
				mesh.castShadow = true;
			} );
		this.meshes.groundPlane.castShadow = false;

		// ---------------------------------------------------
		// Transform Geometry
		this.meshes.groundPlane.geometry.rotateX( -Math.PI / 2 );
		return this;
	}

	setupLights( options ) {
		_.extend( this.lights, {
			pointLight: new THREE.PointLight( 0xffffff, 1 ),
			// dirctionalLight: new THREE.DirectionalLight(0xffffff, 2)
		} );

		// ---------------------------------------------------
		// Shadows

		this.lights.pointLight.castShadow = true;
		this.lights.pointLight.shadow.camera.near = 1;
		this.lights.pointLight.shadow.camera.far = 5000;
		this.lights.pointLight.shadow.bias = 0.01;

		return this;
	}

	layoutScene( options ) {
		super.layoutScene( this.options );
		// ---------------------------------------------------
		// Position Lights
		this.lights.pointLight.position.set( 500, 250, -350 );

		// ---------------------------------------------------
		// Position Meshes
		this.meshes.cyl.position.set( 300, 50, 0 );
		this.meshes.sph.position.set( -300, 50, 0 );
		this.meshes.cube.position.set( 0, 100, 0 );
		return this;
	}
}

module.exports = FacebookInstallation;
