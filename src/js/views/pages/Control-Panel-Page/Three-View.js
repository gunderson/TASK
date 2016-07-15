var _ = require( 'lodash' );
var View = require( '_TASK/views/View' );
var THREE = require( 'three' );

var BasicScene = require( './scenes/BasicScene' );
var BoxLine = require( './scenes/BoxLine' );
var FacebookInstallation = require( './scenes/FacebookInstallation' );

class ThreeView extends View {
	constructor( options ) {

		super( _.merge( {

			// ---------------------------------------------------
			// Class Properties

			name: 'three-holder',
			el: '.three-holder',

			// ---------------------------------------------------
			// Local Properties

			// ---------------------------------------------------
			// Event Listeners

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'update',
				'draw',
				'setup',
				'onResize'
			]
		}, options, View.mergeRules ) );
	}

	// ---------------------------------------------------
	// Setup Threejs

	setup() {
		// Renderer
		this.renderer = new THREE.WebGLRenderer( {
			alpha: true
		} );
		this.renderer.setClearColor( 0xffffff, 0 );
		this.renderer.setSize( this.el.innerWidth, this.el.innerHeight );
		this.$el.append( this.renderer.domElement );

		// Scenes
		this.scenes = {
			'Box Line': new BoxLine( {
				el: this.el,
				renderer: this.renderer
			} ),
			'Single Box': new BasicScene( {
				el: this.el,
				renderer: this.renderer
			} ),
			'facebook': new FacebookInstallation( {
				el: this.el,
				renderer: this.renderer
			} )
		};
		this.changeScene( 'facebook' );
		return this;
	}

	changeScene( name ) {
		// console.log( 'Three-View changeScene to:', name, this.activeScene ? `from: ${this.activeScene.name}` : '' );
		// TODO: fade out
		this.activeScene = this.scenes[ name ];
		this.activeScene.setup( {
			renderer: this.renderer
		} );
		this.onResize();
		// console.log( 'Three-View activeScene:', this.activeScene );
		// TODO: fade up
	}

	onResize() {
		this.width = this.$el.width();
		this.height = this.$el.height();
		this.halfWidth = this.width * 0.5;
		this.halfHeight = this.height * 0.5;

		_.each( this.scenes, ( s ) => {
			s.width = this.width;
			s.height = this.height;
			s.halfWidth = this.halfWidth;
			s.halfHeight = this.halfHeight;
		} );
		if ( this.renderer ) this.renderer.setSize( this.width, this.height );
		if ( this.activeScene ) this.activeScene.onResize();
	};

	update( data ) {
		this.activeScene.update( data );
	};

	draw() {
		this.activeScene.render( {
			time: Date.now()
		} );
	};

}

module.exports = ThreeView;
