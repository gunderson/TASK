var _ = require( 'lodash' );
var $ = require( 'jquery' );
var TaskView = require( '_TASK/views/View' );
var TASK = TaskView;
var THREE = require( 'three' );
var BasicScene = require( './scenes/BasicScene' );

class ThreeView extends TaskView {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.extend( {
			name: 'three-holder',
			el: '.three-holder'
		}, options ) );

		// ---------------------------------------------------
		// Bind Functions

		TASK.bindFunctions( this, [
			'update',
			'draw',
			'setup'
		] );

		// ---------------------------------------------------
		// Event Listeners

	}

	// ---------------------------------------------------
	// Setup Threejs

	setup() {
		// Renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( this.el.innerWidth, this.el.innerHeight );
		this.$el.append( this.renderer.domElement );

		// Scenes
		var scenes = {
			main: new BasicScene( {
				el: this.el
			} )
		};

		this.activeScene = scenes.main;
	}

	changeScene( name ) {
		// TODO: fade out
		this.activeScene = this.scenes[ name ];
		this.activeScene.onResize();
		// TODO: fade up
	}

	onResize() {
		this.activeScene.onResize();
		this.renderer.setSize( this.el.offsetWidth, this.el.offsetHeight );
	};

	update( data ) {
		this.activeScene.update( data );
	};

	draw() {
		this.renderer.render( this.activeScene.scene, this.activeScene.camera );
	};

}

module.exports = ThreeView;
