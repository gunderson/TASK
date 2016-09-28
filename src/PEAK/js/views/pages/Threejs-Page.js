var _ = require( 'lodash' );
var AnimationPlayerPage = require( './Animation-Player-Page' );
import MouseTelemetrics from '_art-kit/io/MouseTelemetrics';

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
			mouseTelemetrics: new MouseTelemetrics(),

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'afterRender',
				'onMouseMove',
				'play',
				'stop',
				'update',
				'draw',
				'setupThreeView'
			],

			// ---------------------------------------------------
			// Event Listeners

			events: [ {
				eventName: 'mousemove',
				target: '$el',
				handler: 'onMouseMove'
			} ],

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
			throw new Error( 'threeView must be set by child class' );
		}
		return this;
	}

	// ---------------------------------------------------
	// Event Handlers

	onResize() {
		if ( this.threeView ) this.threeView.onResize();
	}

	// ---------------------------------------------------

	onMouseMove( e ) {
		this.mouseTelemetrics.update( e );
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
