var _ = require( 'lodash' );
var AnimationPlayerPage = require( './Animation-Player-Page' );

class ThreejsPage extends AnimationPlayerPage {
	constructor( options ) {
		super( _.mergeWith( {

			// ---------------------------------------------------
			// Class Properties

			name: 'Threejs',
			autoPlay: true,
			autoStop: true,

			// ---------------------------------------------------
			// local Properties

			threeView: null,

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'afterRender',
				'play',
				'stop',
				'update',
				'draw',
				'setupThreeView'
			],

			// ---------------------------------------------------
			// Event Listeners

			events: [],

			// ---------------------------------------------------
			// Data Binding

			dataBindings: []
		}, options, ThreejsPage.mergeRules ) );

		// ---------------------------------------------------
		// Finish setup
	}

	// ---------------------------------------------------

	setupThreeView() {
		if ( !this.threeView || !this.threeView.setup() ) {
			throw new Error( 'threeView must be set by Page that subclasses Threejs-Page' );
		}
		return this;
	}

	// ---------------------------------------------------
	// Event Handlers

	onResize() {
		if ( this.threeView ) this.threeView.onResize();
	}

	// ---------------------------------------------------

	// ---------------------------------------------------
	// PEAK/Page Overrides

	// transitionIn() {
	// 	super.transitionIn();
	// 	}
	//
	// transitionInComplete() {
	// 	super.transitionInComplete();
	// }
	//
	// // ---------------------------------------------------
	//
	// transitionOut() {
	// 	super.transitionOut();
	// }
	//
	// // ---------------------------------------------------
	//
	// beforeRender() {
	// 	super.beforeRender();
	// }

	// ---------------------------------------------------

	afterRender() {
		super.afterRender();
		this.setupThreeView();
	};

	// ---------------------------------------------------
	// PEAK/AnimationPlayerPage Overrides

	play() {
		super.play();
		return this;
	};

	// ---------------------------------------------------

	stop() {
		super.stop();
		return this;
	};

	update( data ) {
		// console.log( 'update' )
		this.threeView.update( _.extend( {
			mouseTelemetrics: this.mouseTelemetrics
		}, data ) );
		return this;
	}

	draw() {
		// console.log( 'draw' )
		this.threeView.draw();
		return this;
	}
}

module.exports = ThreejsPage;
