var TASKView = require( '_TASK/views/View' );
var _ = require( 'lodash' );
var $ = require( 'jquery' );
var THREE = require( 'three' );

class Scene extends TASKView {
	constructor( options ) {
		super( _.merge( {
			// ---------------------------------------------------
			// Local Properties

			camera: {
				fov: 75,
				near: 1,
				far: 100000
			},
			clearColor: 0xffffff,
			clearAlpha: 1,
			assets: [],
			geometry: {},
			materials: {},
			meshes: {},
			lights: {},
			shaders: {},
			textures: {}
		}, options ) );
	}

	setup() {
		console.log( 'Scene::setup' );
		return this.loadAssets( this.options )
			.then( () => {
				// this.renderer.setClearColor( this.options.clearColor, this.options.clearAlpha );
				this.setupShaders( this.options );
				this.setupMaterials( this.options );
				this.setupGeometry( this.options );
				this.setupMeshes( this.options );
				this.setupScene( this.options );
				this.layoutScene( this.options );
				this.setupLights( this.options );
				this.setupCamera( this.options );
			} );
	}

	// setup scene
	loadAssets( options ) {
		var deferred = $.Deferred();
		// load options.assets
		// load stuff in here
		// resolve the deferred when load is complete
		deferred.notify( 1 );
		deferred.resolve();
		return deferred.promise();
	};

	setupScene( options ) {
		this.scene = new THREE.Scene();
		_.each( this.meshes, ( m ) => this.scene.add( m ) );
		_.each( this.lights, ( l ) => this.scene.add( l ) );
		this.layoutScene();
		return this;
	}

	// setup camera

	setupCamera( options ) {
		this.camera = new THREE.PerspectiveCamera(
			options.camera.fov,
			options.el.innerWidth / options.el.innerHeight,
			options.camera.near,
			options.camera.far );
		this.camera.position.x = options.camera.position.x;
		this.camera.position.y = options.camera.position.y;
		this.camera.position.z = options.camera.position.z;
		this.camera.lookAt( options.camera.lookAt || this.scene.position );
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

	layoutScene( options ) {
		return this;
	}

	render() {
		this.renderer.render();
	}

	onResize() {
		console.trace( 'Scene onResize' );
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
	}

	update( data ) {}
}

module.exports = Scene;
