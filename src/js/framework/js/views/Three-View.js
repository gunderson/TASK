var _ = require( 'lodash' );
var $ = require( 'jquery' );
var TaskView = require( './View' );
var THREE = require( 'three' );
var TweenMax = require( 'TweenMax' );

class ThreeView extends TaskView {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.extend( {
			name: '',
			el: ''
		}, options ) );


		// ---------------------------------------------------
		// Bind Functions

		TaskView.bindFunctions( this, [
			'setup',
			'setupScene',
			'update',
			'draw',
			'loadAssets'
		] );

		// ---------------------------------------------------
		// Event Listeners

	}

	// ---------------------------------------------------
	// Setup Threejs

	setup() {
		this.loadAssets()
			.then( () => setupScene( this.el ) );
	};

	loadAssets() {
		var deferred = $.Deferred();
		// load stuff in here
		// resolve the deferred when load is complete
		deferred.resolve();
		return deferred;
	};

	onResize() {
		super();
	};

	update() {
		update();
	};

	draw() {
		draw();
	};

	// ---------------------------------------------------
	// Getter & Setters

	get raf() {
		return raf;
	}

}

module.exports = ThreeView;


// ---------------------------------------------------
// Setup Three

var raf;
var scene, renderer, camera;
var geometry, material, mesh;

function setupScene( el ) {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, el.innerWidth / el.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	geometry = new THREE.BoxGeometry( 200, 200, 200 );
	material = new THREE.MeshBasicMaterial( {
		color: 0xff0000,
		wireframe: true
	} );

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( el.innerWidth, el.innerHeight );

	el.append( renderer.domElement );

};

function update( data ) {

}

function draw() {
	raf = requestAnimationFrame( draw );

}
