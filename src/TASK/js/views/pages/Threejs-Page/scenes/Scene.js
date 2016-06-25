var TASKView = require( '_TASK/views/View' );
var _ = require( 'lodash' );
var $ = require( 'jquery' );
var THREE = require( 'three' );

class Scene extends TASKView {
	constructor( options ) {
		super( options );
		options = _.merge( {
			camera: {
				fov: 75,
				near: 1,
				far: 10000
			}
		}, options );

		this.geometry = {};
		this.materials = {};
		this.meshes = {};
		this.lights = {};
		this.shaders = {};
		this.textures = {};


		this.loadAssets()
			.then( () => {
				this.setupShaders( options );
				this.setupMaterials( options );
				this.setupGeometry( options );
				this.setupMeshes( options );
				this.setupCamera( options );
				this.setupLights( options );
				this.setupScene( options );
			} );
	}

	// setup scene
	// TODO: move asset load to individual scenes
	loadAssets() {
		var deferred = $.Deferred();
		// load stuff in here
		// resolve the deferred when load is complete
		deferred.resolve();
		return deferred;
	};

	setupScene( options ) {
		this.scene = new THREE.Scene();
		_.each( this.meshes, ( m ) => this.scene.add( m ) );
		_.each( this.lights, ( l ) => this.scene.add( l ) );
		return this;
	}

	// setup camera

	setupCamera( options ) {
		this.camera = new THREE.PerspectiveCamera(
			options.camera.fov,
			options.el.innerWidth / options.el.innerHeight,
			options.camera.near,
			options.camera.far );
		this.camera.position.z = 1000;
		return this;
	}

	// setup elements

	setupGeometry( options ) {
		return this;
	}

	setupMaterials( options ) {
		return this;
	}

	setupShaders( options ) {
		return this;
	}

	setupMeshes( options ) {
		return this;
	}

	setupLights( options ) {
		return this;
	}

	onResize() {
		var w = this.options.el.offsetWidth;
		var h = this.options.el.offsetHeight;
		this.camera.aspect = w / h;
		this.camera.updateProjectionMatrix();
	}

	update( data ) {}
}

module.exports = Scene;
